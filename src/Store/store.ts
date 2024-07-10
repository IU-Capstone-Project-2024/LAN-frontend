import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import datingReducer from './slices/datingSlice';
import favoritesReducer from './slices/favoritesSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "@/Store/api/telegramDataApi";
import filterReducer from './slices/filterSlice';
import birthdayReducer from './slices/birthdaySlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    dating: datingReducer,
    favorites: favoritesReducer,
    filters: filterReducer,
    birthday: birthdayReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

