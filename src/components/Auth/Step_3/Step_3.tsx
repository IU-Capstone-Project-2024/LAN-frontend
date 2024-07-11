"use client"

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/Styles/Auth/Step3.module.scss";
import Interests from "@/components/Profile/ProfileSettings/Interests/Interests";
import CoLifeSettings from "@/components/Profile/ProfileSettings/CoLife/CoLife";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { setInterests, setCoLife, setName, setPhotos, setGender, setReligion, setAbout, setSocialLinks } from "@/Store/slices/profileSlice";

const Step3: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const savedProfileStep3 = JSON.parse(localStorage.getItem('profileStep3') || '{}');
    const savedProfileStep2 = JSON.parse(localStorage.getItem('profileStep2') || '{}');
    const savedProfileStep1 = JSON.parse(localStorage.getItem('profileStep1') || '{}');
    if (savedProfileStep3) {
      console.log("Loaded profile step 3 data from localStorage:", savedProfileStep3);
      if (savedProfileStep3.interests) dispatch(setInterests(savedProfileStep3.interests));
      if (savedProfileStep3.coLifeSettings) dispatch(setCoLife(savedProfileStep3.coLifeSettings));
    }
    if (savedProfileStep2) {
      console.log("Loaded profile step 2 data from localStorage:", savedProfileStep2);
      if (savedProfileStep2.about) dispatch(setAbout(savedProfileStep2.about));
      if (savedProfileStep2.socialLinks) dispatch(setSocialLinks(savedProfileStep2.socialLinks));
    }
    if (savedProfileStep1) {
      console.log("Loaded profile step 1 data from localStorage:", savedProfileStep1);
      if (savedProfileStep1.name) dispatch(setName(savedProfileStep1.name));
      if (savedProfileStep1.photos) dispatch(setPhotos(savedProfileStep1.photos));
      if (savedProfileStep1.gender) dispatch(setGender(savedProfileStep1.gender));
      if (savedProfileStep1.religion) dispatch(setReligion(savedProfileStep1.religion));
    }
    setIsInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized) {
      const profileStep3Data = {
        interests: profile.interests,
        coLifeSettings: profile.coLife
      };
      localStorage.setItem('profileStep3', JSON.stringify(profileStep3Data));
      localStorage.setItem('currentStep', '3');
      console.log("Saved profile step 3 data to localStorage:", profileStep3Data);
    }
  }, [profile.interests, profile.coLife, isInitialized]);

  const nextStep = () => {
    localStorage.removeItem('profileStep1');
    localStorage.removeItem('profileStep2');
    localStorage.removeItem('profileStep3');
    localStorage.removeItem('currentStep');
    router.push('/profile');
  };

  const prevStep = () => {
    router.push('/auth/step_2');
  }

  return (
    <div className={styles.container}>
      <h1>Создание профиля (3/3)</h1>
      <Interests />
      <div className={styles["co-life"]}>
        <CoLifeSettings title="Заполните опрос:" />
      </div>
      <div className={styles.buttons}>
        <button className={styles["button"]} onClick={prevStep}>Назад</button>
        <button className={styles["button"]} onClick={nextStep}>Завершить</button>
      </div>
    </div>
  );
};

export default Step3;
