"use client"

import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { resetFilters } from '@/Store/slices/filterSlice';
import styles from '@/Styles/Filter/Filter.module.scss';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import AgeFilter from './AgeFilter/AgeFilter';
import GenderFilter from './GenderFilter/GenderFilter';
import InterestsFilter from './InterestsFilter/InterestsFilter';
import CoLifeFilter from "./CoLifeFilter/CoLifeFilter";
import {useRouter} from "next/navigation";

const Filter: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleSave = () => {
    router.push('/dating');
  }

  return (
      <div className={styles.filter_container}>
        <h1>Фильтры</h1>
        <CategoryFilter />
        <AgeFilter />
        <GenderFilter />
        <InterestsFilter />
        <CoLifeFilter />
        <div className={styles['button-group']}>
          <button onClick={handleSave}>Применить</button>
          <button onClick={handleReset}>Сбросить</button>
        </div>
      </div>
  );
};

export default Filter;
