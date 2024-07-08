"use client"

import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/ProfileSettings/profileSettings.module.scss';
import { RootState } from "@/Store/store";
import UploadPhoto from "@/components/UniversalComponents/UploadPhoto/UploadPhoto";
import {
  setAge,
  setName,
  setReligion,
  setSocialLinks,
  setPhotos,
  setModalPhoto,
  setShowModal,
} from "@/Store/slices/profileSlice";
import ModalPhoto from "@/components/ProfileSettings/ModalPhoto/ModalPhoto";
import CoLifeSettings from "@/components/ProfileSettings/CoLife/CoLife";
import Interests from "@/components/ProfileSettings/Interests/Interests";
import About from "@/components/ProfileSettings/About/About";
import BirthdayInput from "@/components/UniversalComponents/BirthdayInput/BirthdayInput";
import SocialLinks from "@/components/ProfileSettings/SocialLinks/SocialLinks";

const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const [profileState, setProfileState] = useState({
    name: profile.name,
    age: profile.age,
    religion: profile.religion,
    about: profile.about,
    interests: profile.interests,
    coLife: profile.coLife,
    socialLinks: profile.socialLinks,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    switch (name) {
      case 'name':
        dispatch(setName(value));
        break;
      case 'age':
        dispatch(setAge(Number(value)));
        break;
      case 'religion':
        dispatch(setReligion(value));
        break;
      case 'socialLinks':
        dispatch(setSocialLinks([value]));
        break;
    }
  };

  const handleSave = () => {
    router.push('/profile');
  };

  const handlePhotoAdd = (photo: string) => {
    dispatch(setPhotos([...profile.photos, photo]));
  };

  const handlePhotoClick = (photo: string) => {
    dispatch(setModalPhoto(photo));
    dispatch(setShowModal(true));
  };


  return (
    <div className={styles['profile-settings']}>
      <h2>Настройки профиля</h2>
      <UploadPhoto
          photos={profile.photos}
          onPhotoAdd={handlePhotoAdd}
          onPhotoClick={handlePhotoClick}
          isModalOpen={isModalOpen}
          onModalOpen={() => setIsModalOpen(true)}
          onModalClose={() => setIsModalOpen(false)}
      />
      <ModalPhoto show={profile.showModal}/>
      <div className={styles.inputContainer}>
        <input type="text" name="name" value={profileState.name} onChange={handleInputChange} placeholder='Имя' />
      </div>
      <div className={styles.ageAndReligion}>
        <div className={styles.ageContainer}>
          <BirthdayInput title='Дата рождения:'/>
        </div>
        <div className={styles.religionContainer}>
          <label className={styles["religion_label"]}>Религия:</label>
          <input type="text" name="religion" value={profileState.religion} onChange={handleInputChange} placeholder='Атеист' />
        </div>
      </div>
      <About></About>
      <Interests></Interests>
      <CoLifeSettings title="Co-Life"/>
      <SocialLinks/>
      <button className={styles.save_button} onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default ProfileSettings;