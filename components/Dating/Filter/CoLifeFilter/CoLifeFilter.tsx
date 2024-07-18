import React, { FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import {
  setNightOwl,
  setCleanliness,
  setNoiseLevel,
  setAlcohol,
  setSmoking
} from '@/Store/slices/filterSlice';
import styles from '@/Styles/Dating/Filter/CoLifeFilter.module.scss';
import RangeSlider from "@/components/UniversalComponents/RangeSlider/RangeSlider";

const CoLifeFilter: FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const handleNightOwlChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNightOwl(Number(e.target.value)));
  };

  const handleCleanlinessChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCleanliness(Number(e.target.value)));
  };

  const handleNoiseLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNoiseLevel(Number(e.target.value)));
  };

  const handleAlcoholChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAlcohol(Number(e.target.value)));
  };

  const handleSmokingChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSmoking(Number(e.target.value)));
  };

  return (
      <div className={styles['quality-group']}>
        <label className={styles.title}>Качества в соседе</label>
        <RangeSlider
            value={filters.nightOwl}
            leftLabel={'Сова'}
            rightLabel={'Жаворонок'}
            onChange={handleNightOwlChange}/>

        <RangeSlider
            value={filters.cleanliness}
            leftLabel={'Чистота важна'}
            rightLabel={'Чистота не так важна'}
            onChange={handleCleanlinessChange}/>

        <RangeSlider
            value={filters.noiseLevel}
            leftLabel={'Люблю тишину и покой'}
            rightLabel={'Люблю шум и компанию'}
            onChange={handleNoiseLevelChange}/>
        <RangeSlider
            value={filters.alcohol}
            leftLabel={'Пью алкоголь'}
            rightLabel={'Не пью'}
            onChange={handleAlcoholChange}/>
        <RangeSlider
            value={filters.smoking}
            leftLabel={'Курю'}
            rightLabel={'Не курю'}
            onChange={handleSmokingChange}/>
      </div>
  );
};

export default CoLifeFilter;
