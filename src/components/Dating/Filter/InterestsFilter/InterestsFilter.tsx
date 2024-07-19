import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { setInterests } from '@/Store/slices/filterSlice';
import styles from '@/Styles/Dating/Filter/InterestsFilter.module.scss';
import Interests from "@/components/Profile/ProfileSettings/Interests/Interests";

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
      <Interests/>
    </div>
  );
};

export default InterestsFilter;
