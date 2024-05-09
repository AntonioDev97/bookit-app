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
        }),
        newRoom: builder.mutation({
            query(body) {
                return {
                    url: "/admin/rooms",
                    method: "POST",
                    body,
                };
            },
        }),
        updateRoom: builder.mutation({
            query({ id, body }) {
                return {
                    url: `/admin/rooms/${id}`,
                    method: "PUT",
                    body,
                };
            },
        }),
        uploadRoomImages: builder.mutation({
            query({ id, body }) {
                return {
                    url: `/admin/rooms/${id}/images`,
                    method: "PUT",
                    body,
                };
            },
        }),
        deleteRoomImage: builder.mutation({
            query({ id, body }) {
                return {
                    url: `/admin/rooms/${id}/images`,
                    method: "DELETE",
                    body,
                };
            },
        }),
        deleteRoom: builder.mutation({
            query(id) {
                return {
                    url: `/admin/rooms/${id}`,
                    method: "DELETE",
                };
            },
        }),
    })
});

export const {
    usePostReviewMutation,
    useCanUserReviewQuery,
    useNewRoomMutation,
    useUpdateRoomMutation,
    useUploadRoomImagesMutation,
    useDeleteRoomImageMutation,
    useDeleteRoomMutation
} = RoomAPI;