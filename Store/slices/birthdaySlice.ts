import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BirthdayState {
  date: string;
  age: number;
}

const initialState: BirthdayState = {
  date: '',
  age: 0,
};

const calculateAge = (birthday: string): number => {
  const [day, month, year] = birthday.split('.').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const birthdaySlice = createSlice({
  name: 'birthday',
  initialState,
  reducers: {
    setBirthday(state, action: PayloadAction<string>) {
      state.date = action.payload;
      state.age = calculateAge(action.payload);
    },
    setUserInfo(state, action: PayloadAction<{ date_of_birth: string }>) {
      state.date = action.payload.date_of_birth;
      state.age = calculateAge(action.payload.date_of_birth);
    },
  },
});

export const { setBirthday, setUserInfo } = birthdaySlice.actions;
export default birthdaySlice.reducer;
