import React, { FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { setInterests } from '@/Store/slices/filterSlice';
import styles from '@/styles/Filter/Filter.module.scss';

const InterestsFilter: FC = () => {
  const dispatch = useDispatch();
  const interests = useSelector((state: RootState) => state.filters.interests);

  const handleInterestsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    dispatch(setInterests(selectedOptions));
  };

  return (
      <div className={styles['interests-group']}>
        <label>Интересы</label>
        <select multiple onChange={handleInterestsChange} value={interests}>
          <option value="Музыка">Музыка</option>
          <option value="Спорт">Спорт</option>
          <option value="Книги">Книги</option>
        </select>
      </div>
  );
};

export default InterestsFilter;
