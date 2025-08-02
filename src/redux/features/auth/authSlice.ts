import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface IUser {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface AuthState {
    user: IUser | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'stremeAuth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('auth');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.stremeAuth.user;  