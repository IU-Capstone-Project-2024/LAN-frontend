import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoLifePreferences {
  nightOwl: number;
  cleanliness: number;
  noiseLevel: number;
  alcohol: number;
  smoking: number;
}

interface ProfileState {
  photos: string[];
  name: string;
  age: number;
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
  name: 'Name',
  age: 20,
  religion: 'Religion',
  about: '',
  interests: [],
  coLife: {
    nightOwl: 1,
    cleanliness: 1,
    noiseLevel: 1,
    alcohol: 1,
    smoking: 1,
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