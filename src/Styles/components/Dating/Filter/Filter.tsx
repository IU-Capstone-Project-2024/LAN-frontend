"use client"

import React, { FC } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetFilters, setGender} from '@/Store/slices/filterSlice';
import styles from '@/Styles/Dating/Filter/Filter.module.scss';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import AgeFilter from './AgeFilter/AgeFilter';
import InterestsFilter from './InterestsFilter/InterestsFilter';
import CoLifeFilter from "./CoLifeFilter/CoLifeFilter";
import {useRouter} from "next/navigation";
import SelectGender from "@/components/UniversalComponents/SelectGender/SelectGender";
import {RootState} from "@/Store/store";

const Filter: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedGender = useSelector((state: RootState) => state.filters.gender);

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleSave = () => {
    router.push('/dating');
  }

  const handleSelectGender = (option: string) => {
    dispatch(setGender(option));
  };


  return (
      <div className={styles.filter_container}>
        <h1>Фильтры</h1>
        <CategoryFilter />
        <AgeFilter />
        <SelectGender title="Пол" options={['Мужской', 'Женский', 'Любой']} safeGender={handleSelectGender} selectedGender={selectedGender}/>
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
