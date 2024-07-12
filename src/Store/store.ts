import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import datingReducer from './slices/datingSlice';
import favoritesReducer from './slices/favoritesSlice';
import matchesReducer from './slices/matchesSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "@/Store/api/telegramDataApi";
import filterReducer from './slices/filterSlice';
import birthdayReducer from './slices/birthdaySlice';
import authReducer from './slices/authSlice';
import { profileApi } from './api/profileApi';
import { metricsApi } from './api/metricsApi';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    dating: datingReducer,
    favorites: favoritesReducer,
    matches: matchesReducer,
    filters: filterReducer,
    birthday: birthdayReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware, metricsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;