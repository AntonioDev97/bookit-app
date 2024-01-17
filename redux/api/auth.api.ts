import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query(body) {
                return {
                    url: '/users',
                    method: 'POST',
                    body
                }
            }
        }),
        update: builder.mutation({
            query(body) {
                return {
                    url: '/users/me',
                    method: 'PUT',
                    body
                }
            }
        }),
        updateSession: builder.query({
            query() { 
                return { url: '/auth/session?update' } 
            }
        }),
        updatePassword: builder.mutation({
            query(body) {
                return {
                    url: '/users/me/password',
                    method: 'PATCH',
                    body
                }
            }
        }),
        recoverPassword: builder.mutation({
            query(body) {
                return {
                    url: '/users/me/password/recover',
                    method: 'POST',
                    body
                }
            }
        }),
        resetPassword: builder.mutation({
            query({ token, body }) {
                return {
                    url: `/users/me/password/recover/${token}`,
                    method: "PUT",
                    body,
                };
            },
        }),
        updateAvatar: builder.mutation({
            query(body) {
                return {
                    url: '/users/me/avatar',
                    method: 'PATCH',
                    body
                }
            }
        }),
    })
});

export const {
    useRegisterMutation,
    useUpdateMutation,
    useLazyUpdateSessionQuery,
    useUpdatePasswordMutation,
    useUpdateAvatarMutation,
    useRecoverPasswordMutation,
    useResetPasswordMutation
} = AuthAPI;