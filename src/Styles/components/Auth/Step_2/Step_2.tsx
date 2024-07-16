"use client"

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/Styles/Auth/Step2.module.scss";
import About from "@/components/Profile/ProfileSettings/About/About";
import SocialLinks from "@/components/Profile/ProfileSettings/SocialLinks/SocialLinks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { setAbout, setSocialLinks } from "@/Store/slices/profileSlice";
import { useUpdateUserInfoMutation } from "@/Store/api/profileApi";

const Step2: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [updateUserInfo] = useUpdateUserInfoMutation();

  useEffect(() => {
    const savedProfileStep2 = JSON.parse(localStorage.getItem('profileStep2') || '{}');
    if (savedProfileStep2) {
      console.log("Loaded profile step 2 data from localStorage:", savedProfileStep2);
      if (savedProfileStep2.about) dispatch(setAbout(savedProfileStep2.about));
      if (savedProfileStep2.socialLinks) dispatch(setSocialLinks(savedProfileStep2.socialLinks));
    }
    setIsInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized) {
      const profileStep2Data = {
        about: profile.about,
        socialLinks: profile.socialLinks
      };
      localStorage.setItem('profileStep2', JSON.stringify(profileStep2Data));
      localStorage.setItem('currentStep', '2');
      console.log("Saved profile step 2 data to localStorage:", profileStep2Data);
    }
  }, [profile, isInitialized]);

  const nextStep = () => {
    const updatedProfile = {
      about: profile.about,
      soc_media: profile.socialLinks
    };
    try {
      updateUserInfo(updatedProfile).unwrap();
      router.push('/auth/step_3');
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  const prevStep = () => {
    router.push('/auth/step_1');
  }

  const updateAbout = (about: string) => {
    dispatch(setAbout(about));
  };

  return (
    <div className={styles.container}>
      <h1>Создание профиля (2/3)</h1>
      <div className={styles["about"]}>
        <About title='Расскажите о себе' updateAbout={updateAbout} />
      </div>
      <div className={styles["links"]}>
        <SocialLinks />
      </div>
      <div className={styles.buttons}>
        <button className={styles["button"]} onClick={prevStep}>Назад</button>
        <button className={styles["button"]} onClick={nextStep}>Далее</button>
      </div>
    </div>
  );
};

export default Step2;
