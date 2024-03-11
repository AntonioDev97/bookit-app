import { INotifications } from "@/interfaces/app.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: INotifications = {
    active: true,
    data: []
};

export const notificationsSlice = createSlice({
    initialState,
    name: 'notifications',
    reducers: {
        setActiveNotifications: (state, action: PayloadAction<any>) => {
            state.active = action.payload
        },
        setNotification: (state, action: PayloadAction<any>) => {
            if (!action.payload.caption) action.payload.caption = new Date().toLocaleString();
            state.data = [ ...state.data, action.payload]
        }
    }
});

export default notificationsSlice.reducer;
export const { setActiveNotifications, setNotification } = notificationsSlice.actions;