import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BirthdayState {
  date: string;
  age: number | undefined;
}

const initialState: BirthdayState = {
  date: '',
  age: undefined,
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
  },
});

export const { setBirthday } = birthdaySlice.actions;
export default birthdaySlice.reducer;