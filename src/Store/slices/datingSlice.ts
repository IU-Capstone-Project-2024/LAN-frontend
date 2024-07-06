import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoLifePreferences {
  nightOwl: number;
  cleanliness: number;
  noiseLevel: number;
  alcohol: number;
  smoking: number;
}

export interface Profile {
  id: number;
  photos: string[];
  name: string;
  age: number;
  religion: string;
  about: string;
  interests: string[];
  coLife: CoLifePreferences;
  socialLinks: string[];
}

interface ProfilesState {
  profiles: Profile[];
  currentProfileIndex: number;
}

const initialState: ProfilesState = {
  profiles: [],
  currentProfileIndex: 0,
};

const datingProfileSlice = createSlice({
  name: 'dating',
  initialState,
  reducers: {
    loadProfiles(state, action: PayloadAction<Profile[]>) {
      state.profiles = action.payload;
    },
    likeProfile(state) {
      state.currentProfileIndex = (state.currentProfileIndex + 1) % state.profiles.length;
    },
    dislikeProfile(state) {
      state.currentProfileIndex = (state.currentProfileIndex + 1) % state.profiles.length;
    },
    previousProfile(state) {
      state.currentProfileIndex =
          (state.currentProfileIndex - 1 + state.profiles.length) % state.profiles.length;
    },
  },
});

export const { loadProfiles, likeProfile, dislikeProfile, previousProfile } = datingProfileSlice.actions;
export default datingProfileSlice.reducer;
