import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category: string;
  ageRange: [number, number];
  gender: string;
  interests: string[];
  nightOwl: number;
  cleanliness: number;
  noiseLevel: number;
  alcohol: number;
  smoking: number;
}

const initialState: FilterState = {
  category: '',
  ageRange: [17, 20],
  gender: '',
  interests: [],
  nightOwl: 0,
  cleanliness: 0,
  noiseLevel: 0,
  alcohol: 0,
  smoking: 0,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setAgeRange(state, action: PayloadAction<[number, number]>) {
      state.ageRange = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setInterests(state, action: PayloadAction<string[]>) {
      state.interests = action.payload;
    },
    setNightOwl(state, action: PayloadAction<number>) {
      state.nightOwl = action.payload;
    },
    setCleanliness(state, action: PayloadAction<number>) {
      state.cleanliness = action.payload;
    },
    setNoiseLevel(state, action: PayloadAction<number>) {
      state.noiseLevel = action.payload;
    },
    setAlcohol(state, action: PayloadAction<number>) {
      state.alcohol = action.payload;
    },
    setSmoking(state, action: PayloadAction<number>) {
      state.smoking = action.payload;
    },
    resetFilters(state) {
      return initialState;
    }
  },
});

export const {
  setCategory,
  setAgeRange,
  setGender,
  setInterests,
  setNightOwl,
  setCleanliness,
  setNoiseLevel,
  setAlcohol,
  setSmoking,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
