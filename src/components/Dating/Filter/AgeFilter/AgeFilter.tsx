import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { setAgeRange } from '@/Store/slices/filterSlice';
import ReactSlider from 'react-slider';
import '@/Styles/Dating/Filter/castomSlider/castomSlider.css';
import styles from '@/Styles/Dating/Filter/AgeFilter.module.scss';

const AgeFilter: FC = () => {
  const dispatch = useDispatch();
  const ageRange = useSelector((state: RootState) => state.filters.ageRange);

  const handleAgeRangeChange = (values: number[]) => {
    dispatch(setAgeRange([values[0], values[1]]));
  };

  return (
      <div className={styles['age-group']}>
        <div className={styles["age-container"]}>
          <label>Возраст</label>
          <span>{ageRange[0]} - {ageRange[1]}</span>
        </div>
        <ReactSlider
            className="react-slider"
            thumbClassName="thumb"
            trackClassName="track"
            min={16}
            max={40}
            value={ageRange}
            onChange={handleAgeRangeChange}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
        />
      </div>
  );
};

export default AgeFilter;

