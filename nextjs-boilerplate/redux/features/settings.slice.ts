import { ISettings } from "@/interfaces/app.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISettings = {
    theme: 'g100',
    loading: false,
    tour: false
};

export const settingsSlice = createSlice({
    initialState,
    name: 'settings',
    reducers: {
        setTheme: (state, action: PayloadAction<any>) => {
            state.theme = action.payload
        },
        setLoading: (state, action: PayloadAction<any>) => {
            state.loading = action.payload
        },
        setTour: (state, action: PayloadAction<any>) => {
            state.tour = action.payload
        }
    }
});

export default settingsSlice.reducer;
export const { setTheme, setLoading, setTour } = settingsSlice.actions;