import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { setInterests } from '@/Store/slices/filterSlice';
import styles from '@/Styles/Dating/Filter/InterestsFilter.module.scss';

const InterestsFilter: FC = () => {
  const dispatch = useDispatch();
  const interests = useSelector((state: RootState) => state.filters.interests);

  const handleInterestToggle = (interest: string) => {
    const newInterests = interests.includes(interest)
      ? interests.filter(i => i !== interest)
      : [...interests, interest];
    dispatch(setInterests(newInterests));
  };

  return (
    <div className={styles['interests-group']}>
      <label>Интересы</label>
      <div className={styles['buttons-container']}>
        <button
          className={`${styles.button} ${interests.includes('Музыка') ? styles.active : ''}`}
          onClick={() => handleInterestToggle('Музыка')}
        >
          Музыка
        </button>
        <button
          className={`${styles.button} ${interests.includes('Спорт') ? styles.active : ''}`}
          onClick={() => handleInterestToggle('Спорт')}
        >
          Спорт
        </button>
        <button
          className={`${styles.button} ${interests.includes('Книги') ? styles.active : ''}`}
          onClick={() => handleInterestToggle('Книги')}
        >
          Книги
        </button>
      </div>
    </div>
  );
};

export default InterestsFilter;
