import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room.model";
import User from "../models/user.model";
import Booking from "../models/booking.model";
import { headers } from "next/headers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Generate stripe checkout session => /api/payment/checkout_session/:roomId
export const stripeCheckoutSession = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const {
        daysOfStay,
        checkIn,
        checkOut,
        amount
    } = Object.fromEntries(new URL(request.url).searchParams);

    const room = await Room.findById(params.id);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${process.env.API_URL}/bookings/me`,
        cancel_url: `${process.env.API_URL}/rooms/${room?._id}`,
        customer_email: request.user.email,
        client_reference_id: params?.id,
        metadata: { checkIn, checkOut, daysOfStay },
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: Number(amount) * 100,
                    product_data: {
                        name: room?.name,
                        description: room?.description,
                        images: [`${room?.images[0]?.url}`]
                    }
                },
                quantity: 1
            }
        ]
    });

    return NextResponse.json({ success: true, session });
};

// Create new booking after payment => /api/payment/webhook
export const webhookCheckout = async (request: NextRequest) => {
    const rawBody = await request.text();
    const signature = headers().get("Stripe-Signature");

    const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_SECRET_WEBHOOK
    );

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const room = session.client_reference_id;
        const user = (await User.findOne({ email: session?.customer_email }))._id;

        const paymentInfo = {
            id: session.payment_intent,
            status: session.payment_status,
            amountPaid: session.amount_total / 100,
            paidAt: Date.now(),
        };

        const checkIn = session.metadata.checkIn;
        const checkOut = session.metadata.checkOut;
        const daysOfStay = session.metadata.daysOfStay;

        await Booking.create({
            room,
            user,
            checkIn,
            checkOut,
            daysOfStay,
            paymentInfo
        });
    }
    return NextResponse.json({ success: true });
};