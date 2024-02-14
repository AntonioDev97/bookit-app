import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BookingAPI = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        newBooking: builder.mutation({
            query(body) {
                return {
                    url: '/bookings',
                    method: 'POST',
                    body
                }
            }
        }),
        availability: builder.query({
            query({ id, checkIn, checkOut }) {
                return {
                    url: `/bookings/availability?roomId=${id}&checkIn=${checkIn}&checkOut=${checkOut}`
                }
            }
        }),
        roomBookedDays: builder.query({
            query(id) {
                return {
                    url: `/bookings/room?roomId=${id}`
                }
            }
        }),
        getSalesStats: builder.query({
            query({ startDate, endDate }) {
                return {
                    url: '/bookings/salesStats',
                    params: {
                        startDate,
                        endDate
                    }
                }
            }
        }),
        stripeCheckout: builder.query({
            query({ id, checkIn, checkOut, daysOfStay, amount }) {
                return {
                    url: `/payment/checkoutSession/${id}`,
                    params: {
                        checkIn,
                        checkOut,
                        daysOfStay,
                        amount
                    }
                }
            }
        })
    })
});

export const {
    useNewBookingMutation,
    useLazyAvailabilityQuery,
    useRoomBookedDaysQuery,
    useLazyStripeCheckoutQuery,
    useLazyGetSalesStatsQuery
} = BookingAPI;