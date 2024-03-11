import { INotifications, ISettings } from "@/interfaces/app.interface";
import { IUserApp } from "@/interfaces/user.interface";
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit"
import { enhancer } from "addon-redux"

// A super-simple mock of the state of the store
const SettingsMockedState: ISettings = {
    theme: 'g100',
    loading: false,
    tour: false
};
const NotificationsMockedState: INotifications = {
    active: true,
    data: []
};
const UserMockedState: IUserApp = {
    user: null,
    isAuthenticated: false
}

export const store = configureStore({
    reducer: {
        settings: createSlice({
            name: 'settings',
            initialState: SettingsMockedState,
            reducers: {
                setTheme: (state, action: PayloadAction<any>) => {
                    state.theme = action.payload
                },
                setTour: (state, action: PayloadAction<any>) => {
                    state.tour = action.payload
                }
            },
        }).reducer,
        notifications: createSlice({
            name: 'notifications',
            initialState: NotificationsMockedState,
            reducers: {
                setActiveNotifications: (state, action: PayloadAction<any>) => {
                    state.active = action.payload
                },
            },
        }).reducer,
        user: createSlice({
            name: 'user',
            initialState: UserMockedState,
            reducers: {
                setUser: (state, action: PayloadAction<any>) => {
                    state.user = action.payload;
                },
                setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
                    state.isAuthenticated = action.payload;
                }
            },
        }).reducer,
    },
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancer),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;