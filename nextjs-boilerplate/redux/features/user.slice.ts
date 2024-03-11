import { IUserApp } from "@/interfaces/user.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IUserApp = {
    user: null,
    isAuthenticated: false
}

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        } 
    }
});

export default userSlice.reducer;
export const { setIsAuthenticated, setUser } = userSlice.actions;