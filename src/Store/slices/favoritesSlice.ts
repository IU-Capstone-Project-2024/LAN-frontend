import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from './datingSlice';

interface FavoritesState {
  favorites: Profile[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Profile>) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(profile => profile.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
