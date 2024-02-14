import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RoomAPI = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query(body) {
                return {
                    url: '/rooms/review',
                    method: 'POST',
                    body
                }
            }
        }),
        canUserReview: builder.query({
            query(id) {
                return {
                    url: `/rooms/review/allow`,
                    params: {
                        roomId: id
                    }
                }
            }
        })
    })
});

export const {
    usePostReviewMutation,
    useCanUserReviewQuery
} = RoomAPI;