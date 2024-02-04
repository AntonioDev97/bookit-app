import { ThunkMiddleware, configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user.slice';
import { AuthAPI } from "./api/auth.api";
import { BookingAPI } from "./api/booking.api";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [AuthAPI.reducerPath]: AuthAPI.reducer,
        [BookingAPI.reducerPath]: BookingAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        AuthAPI.middleware,
        BookingAPI.middleware
    ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;