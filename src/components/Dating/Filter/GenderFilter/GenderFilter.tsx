import React, { FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { setGender } from '@/Store/slices/filterSlice';
import styles from '@/Styles/Filter/Filter.module.scss';

const GenderFilter: FC = () => {
  const dispatch = useDispatch();
  const gender = useSelector((state: RootState) => state.filters.gender);

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setGender(e.target.value));
  };

  return (
      <div className={styles['gender-group']}>
        <label>Пол</label>
        <label>
          <input
              type="radio"
              name="gender"
              value="Мужской"
              checked={gender === 'Мужской'}
              onChange={handleGenderChange}
          />
          Мужской
        </label>
        <label>
          <input
              type="radio"
              name="gender"
              value="Женский"
              checked={gender === 'Женский'}
              onChange={handleGenderChange}
          />
          Женский
        </label>
        <label>
          <input
              type="radio"
              name="gender"
              value="Любой"
              checked={gender === 'Любой'}
              onChange={handleGenderChange}
          />
          Любой
        </label>
      </div>
  );
};

export default GenderFilter;
