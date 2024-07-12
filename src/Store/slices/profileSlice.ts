import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Photo } from '@/Types/types';

interface CoLifePreferences {
  nightOwl: number;
  cleanliness: number;
  noiseLevel: number;
  alcohol: number;
  smoking: number;
}

interface ProfileState {
  photos: Photo[];
  name: string;
  age: number;
  gender: string;
  religion: string;
  about: string;
  interests: string[];
  coLife: CoLifePreferences;
  socialLinks: string[];
  showModal: boolean;
  modalPhoto: Photo | null;
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
    nightOwl: 0,
    cleanliness: 0,
    noiseLevel: 0,
    alcohol: 0,
    smoking: 0,
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
    setCoLife(state, action: PayloadAction<CoLifePreferences>) {
      state.coLife = action.payload;
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
    setPhotos(state, action: PayloadAction<Photo[]>) {
      state.photos = action.payload;
    },
    addPhoto(state, action: PayloadAction<Photo>) {
      if (state.photos.length < 3) {
        state.photos.push(action.payload);
      }
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    setModalPhoto(state, action: PayloadAction<Photo | null>) {
      state.modalPhoto = action.payload;
    },
    setMainPhoto(state, action: PayloadAction<Photo>) {
      const index = state.photos.findIndex(photo => photo.id === action.payload.id);
      if (index > -1) {
        const [mainPhoto] = state.photos.splice(index, 1);
        state.photos.unshift(mainPhoto);
      }
    },
    removePhoto(state, action: PayloadAction<Photo>) {
      state.photos = state.photos.filter(photo => photo.id !== action.payload.id);
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
