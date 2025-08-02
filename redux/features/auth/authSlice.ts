import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  token: string | null;
  user: IUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'stremeAuth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ token: string; user: IUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state:RootState) => state.academiAuth.user;
