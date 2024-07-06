"use client"

import {FC, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/Store/store'
import { loadProfiles } from '@/Store/slices/datingSlice';
import ProfileCard from './ProfileCard/ProfileCard';
import ActionButtons from './ActionButtons/ActionButtons';
import styles from '@/Styles/Dating/Dating.module.scss';

const Dating: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector((state: RootState) => state.dating.profiles);
  const currentProfileIndex = useSelector((state: RootState) => state.dating.currentProfileIndex);

  useEffect(() => {
    fetch('/profile.json')
        .then(response => response.json())
        .then(data => dispatch(loadProfiles(data)));
  }, [dispatch]);

  return (
      <div className={styles.container}>
        {profiles.length > 0 && <ProfileCard profile={profiles[currentProfileIndex]} />}
        <div className={styles["actionButtons"]}>
          <ActionButtons />
        </div>
      </div>
  );
};


export default Dating;