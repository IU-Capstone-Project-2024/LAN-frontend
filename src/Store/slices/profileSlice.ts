import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoLifePreferences } from '@/Types/types';

export interface ProfileState {
  photos: string[];
  name: string;
  age: number;
  gender: string;
  religion: string;
  about: string;
  interests: string[];
  coLife: CoLifePreferences;
  socialLinks: string[];
  showModal: boolean;
  modalPhoto: string | null;
}

const initialState: ProfileState = {
  photos: [],
  name: '',
  age: 0,
  gender: '',
  religion: '',
  about: '',
  interests: [],
  coLife: {
    nightOwl: { name: 'nightOwl', value: 0 },
    cleanliness: { name: 'cleanliness', value: 0 },
    noiseLevel: { name: 'noiseLevel', value: 0 },
    alcohol: { name: 'alcohol', value: 0 },
    smoking: { name: 'smoking', value: 0 },
  },
  socialLinks: [],
  showModal: false,
  modalPhoto: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileState>) {
      return { ...state, ...action.payload };
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
    setReligion(state, action: PayloadAction<string>) {
      state.religion = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setAbout(state, action: PayloadAction<string>) {
      state.about = action.payload;
    },
    setInterests(state, action: PayloadAction<string[]>) {
      state.interests = action.payload;
    },
    setCoLife: (state, action: PayloadAction<Partial<CoLifePreferences>>) => {
      state.coLife = { ...state.coLife, ...action.payload };
    },
    setSocialLinks(state, action: PayloadAction<string[]>) {
      state.socialLinks = action.payload;
    },
    addSocialLink(state) {
      state.socialLinks.push('');
    },
    removeSocialLink(state, action: PayloadAction<number>) {
      state.socialLinks.splice(action.payload, 1);
    },
    updateSocialLink(state, action: PayloadAction<{ index: number, link: string }>) {
      state.socialLinks[action.payload.index] = action.payload.link;
    },
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    addPhoto(state, action: PayloadAction<string>) {
      if (state.photos.length < 3) {
        state.photos.push(action.payload);
      }
    },
    removePhoto(state, action: PayloadAction<string>) {
      state.photos = state.photos.filter(photo => photo !== action.payload);
    },
    setMainPhoto(state, action: PayloadAction<string>) {
      state.photos = state.photos.filter(photo => photo !== action.payload);
      state.photos.unshift(action.payload);
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    setModalPhoto(state, action: PayloadAction<string | null>) {
      state.modalPhoto = action.payload;
    },
  },
});

export const {
  setProfile,
  setName,
  setAge,
  setReligion,
  setGender,
  setAbout,
  setInterests,
  setCoLife,
  setSocialLinks,
  addSocialLink,
  removeSocialLink,
  updateSocialLink,
  setPhotos,
  addPhoto,
  removePhoto,
  setMainPhoto,
  setShowModal,
  setModalPhoto,
} = profileSlice.actions;
export default profileSlice.reducer;