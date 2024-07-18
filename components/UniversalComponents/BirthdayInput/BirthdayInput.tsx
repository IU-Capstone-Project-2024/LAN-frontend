import React, { FC, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { setBirthday } from '@/Store/slices/birthdaySlice';
import { RootState } from '@/Store/store';
import styles from '@/Styles/Universal/BirthdayInput.module.scss';
import { isValidDate } from "@/utils/validateDate";


interface BirthdayInputProps {
  title?: string;
}

const BirthdayInput: FC<BirthdayInputProps> = ({ title }) => {
  const dispatch = useDispatch();
  const birthday = useSelector((state: RootState) => state.birthday.date);
  const registrationDate = new Date();
  const [inputValue, setInputValue] = useState(birthday);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setInputValue(value);
    setError(null);
  };

  const handleBlur = () => {
    if (inputValue && isValidDate(inputValue, registrationDate)) {
      setError(null);
      dispatch(setBirthday(inputValue));
    } else if (inputValue) {
      setError('Недопустимая дата');
    } else {
      setError(null);
      dispatch(setBirthday(''));
    }
  };

  return (
    <div className={styles.birthdayInputContainer}>
      {error && <p className={styles.error}>{error}</p>}
      <div>
        <label htmlFor="birthday">{title}</label>
        <InputMask
          mask="99.99.9999"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className={styles.birthdayInput}
          placeholder="ДД.ММ.ГГГГ"
        />
      </div>
    </div>
  );
};

export default BirthdayInput;