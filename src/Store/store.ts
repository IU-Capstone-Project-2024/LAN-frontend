import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import datingReducer from './slices/datingSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    dating: datingReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

