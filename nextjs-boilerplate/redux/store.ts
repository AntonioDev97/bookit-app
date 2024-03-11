import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from './features/settings.slice';
import userReducer from './features/user.slice';
import notificationsReducer from './features/notifications.slice';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { createNoopStorage } from "@/utils/helpers.util";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore
} from "redux-persist";

const storage = typeof window !== "undefined" ? createWebStorage('local') : createNoopStorage();
const persistConfig = {
    key: 'App-boilerplate-nextjs-app',
    storage,
    whitelist: ['settings']
}

const rootReducers = combineReducers({
    settings: settingsReducer,
    notifications: notificationsReducer,
    user: userReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;