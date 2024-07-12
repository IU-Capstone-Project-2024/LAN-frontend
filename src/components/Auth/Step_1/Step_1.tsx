"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/Styles/Auth/Step1.module.scss';
import UploadPhoto from "@/components/UniversalComponents/UploadPhoto/UploadPhoto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import {
  setGender,
  setModalPhoto,
  setName,
  setPhotos,
  setReligion,
  setShowModal
} from "@/Store/slices/profileSlice";
import ModalPhoto from "@/components/Profile/ProfileSettings/ModalPhoto/ModalPhoto";
import BirthdayInput from "@/components/UniversalComponents/BirthdayInput/BirthdayInput";
import SelectSex from "@/components/UniversalComponents/SelectGender/SelectGender";
import { setBirthday } from '@/Store/slices/birthdaySlice';
import TelegramApp from '@/components/Telegram/Telegram';
import { useUpdateUserInfoMutation } from "@/Store/api/profileApi";

const Step1: React.FC = () => {
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.profile);
  const birthday = useSelector((state: RootState) => state.birthday.date);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const selectedGender = useSelector((state: RootState) => state.profile.gender);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [updateUserInfo] = useUpdateUserInfoMutation();

  useEffect(() => {
    const savedProfileStep1 = JSON.parse(localStorage.getItem('profileStep1') || '{}');
    if (savedProfileStep1) {
      console.log("Loaded profile step 1 data from localStorage:", savedProfileStep1);
      if (savedProfileStep1.name) dispatch(setName(savedProfileStep1.name));
      if (savedProfileStep1.photos) dispatch(setPhotos(savedProfileStep1.photos));
      if (savedProfileStep1.gender) dispatch(setGender(savedProfileStep1.gender));
      if (savedProfileStep1.birthday) dispatch(setBirthday(savedProfileStep1.birthday))
      if (savedProfileStep1.religion) dispatch(setReligion(savedProfileStep1.religion));
    }
    setIsInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized) {
      const profileStep1Data = {
        name: profile.name,
        photos: profile.photos,
        gender: profile.gender,
        birthday: birthday,
        religion: profile.religion
      };
      localStorage.setItem('profileStep1', JSON.stringify(profileStep1Data));
      localStorage.setItem('currentStep', '1');
      console.log("Saved profile step 1 data to localStorage:", profileStep1Data);
    }
  }, [profile, isInitialized, birthday]);

  const handlePhotoAdd = (photo: string) => {
    dispatch(setPhotos([...profile.photos, photo]));
  };

  const handlePhotoClick = (photo: string) => {
    dispatch(setModalPhoto(photo));
    dispatch(setShowModal(true));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const nextStep = () => {
    const updatedProfile = {
      first_name: profile.name,
      photo_url: profile.photos[0],
      date_of_birth: birthday,
      sex: profile.gender,
      religion: profile.religion,
    };

    try {
      updateUserInfo(updatedProfile).unwrap();
      router.push('/auth/step_2');
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const handleReligionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setReligion(e.target.value));
  };

  const handleSelectGender = (option: string) => {
    dispatch(setGender(option));
  };

  return (
    <div className={styles.container}>
      <TelegramApp/>
      <h1>Создание профиля (1/3)</h1>
      <div className={styles["UploadPhoto"]}>
        <span className={styles["span1"]}>Добавьте фото</span>
        <UploadPhoto
          photos={profile.photos}
          onPhotoAdd={handlePhotoAdd}
          onPhotoClick={handlePhotoClick}
          isModalOpen={isModalOpen}
          onModalOpen={handleModalOpen}
          onModalClose={handleModalClose}
        />
      </div>
      <ModalPhoto show={profile.showModal} />
      <div className={styles["Name"]}>
        <span className={styles["span"]}>Как вас зовут?</span>
        <input type="text" placeholder="Ваше имя" name="name" value={profile.name} onChange={handleNameChange} />
      </div>
      <SelectSex selectedGender={selectedGender} safeGender={handleSelectGender} title={'Ваш пол:'} options={[
    { value: '1', label: 'Мужчина' },
    { value: '2', label: 'Женщина' }
  ]} />
      <div className={styles.Birthday}>
        <BirthdayInput title='Дата рождения:' />
      </div>
      <div className={styles["Religion"]}>
        <span className={styles["span"]}>Ваша религия<p>(необязательно)</p></span>
        <input type="text" placeholder="Атеист" name="religion" value={profile.religion} onChange={handleReligionChange} />
      </div>
      <button className={styles["button"]} onClick={nextStep}>Далее</button>
    </div>
  );
};

export default Step1;