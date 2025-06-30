import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/features/auth/authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // localStorage ব্যবহার করবে

// persist config for auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'], // যেগুলো persist করতে চাই সেগুলো
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist এর জন্য কিছু একশন বাদ দিবে
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
