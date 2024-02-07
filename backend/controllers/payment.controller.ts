import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room.model";

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
                    currency: 'mxn',
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