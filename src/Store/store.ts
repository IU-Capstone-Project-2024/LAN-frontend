import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import datingReducer from './slices/datingSlice';
import favoritesReducer from './slices/favoritesSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import {telegramApi} from "@/Store/api/telegramDataApi";
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    dating: datingReducer,
    favorites: favoritesReducer,
    filters: filterReducer,
    [telegramApi.reducerPath]: telegramApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(telegramApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

