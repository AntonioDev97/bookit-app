import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserstate {
    user: any,
    isAuth: boolean
};
const initialState: IUserstate = {
    user: null,
    isAuth: false
};

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        } 
    }
});

export default userSlice.reducer;

export const { setIsAuth, setUser } = userSlice.actions;