"use client"

import React, { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from '@/Styles/Profile/ProfileSettings/profileSettings.module.scss';
import { RootState } from "@/Store/store";
import UploadPhoto from "@/components/UniversalComponents/UploadPhoto/UploadPhoto";
import {
  setAge,
  setName,
  setReligion,
  setSocialLinks,
  setPhotos,
  setModalPhoto,
  setShowModal, setGender, setAbout,
} from "@/Store/slices/profileSlice";
import ModalPhoto from "@/components/Profile/ProfileSettings/ModalPhoto/ModalPhoto";
import CoLifeSettings from "@/components/Profile/ProfileSettings/CoLife/CoLife";
import Interests from "@/components/Profile/ProfileSettings/Interests/Interests";
import About from "@/components/Profile/ProfileSettings/About/About";
import BirthdayInput from "@/components/UniversalComponents/BirthdayInput/BirthdayInput";
import SocialLinks from "@/components/Profile/ProfileSettings/SocialLinks/SocialLinks";
import { useGetUserInfoQuery, useUpdateUserInfoMutation } from '@/Store/api/profileApi';
import { setUserInfo } from '@/Store/slices/birthdaySlice';
import SelectGender from '@/components/UniversalComponents/SelectGender/SelectGender';

const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const birthday = useSelector((state: RootState) => state.birthday.date);
  const selectedGender = useSelector((state: RootState) => state.profile.gender);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: userInfo, isLoading, isFetching } = useGetUserInfoQuery({});
  const [updateUserInfo] = useUpdateUserInfoMutation();
  
  useEffect(() => {
    if (userInfo) {
      dispatch(setUserInfo(userInfo));
      setProfileState({
        photos: userInfo.photo_url || '',
        name: userInfo.first_name || '',
        age: userInfo.date_of_birth || '',
        religion: userInfo.religion || '',
        about: userInfo.about || '',
        interests: userInfo.hobby || '',
        coLife: userInfo.coLife || '',
        socialLinks: userInfo.soc_media || [],
      });
    }
  }, [userInfo, dispatch]);
  
  const [profileState, setProfileState] = useState({
    photos: '',
    name: '',
    age: '',
    religion: '',
    about: '',
    interests: '',
    coLife: '',
    socialLinks: [],
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

  const handleSave = async () => {
    const updatedProfile = {
      first_name: profile.name || '',
      about: profile.about || '',
      photo_url: profile.photos[0] || '',
      date_of_birth: birthday || '',
      sex: profile.gender || '',
      religion: profile.religion || '',
      hobby: profile.interests || '',
      soc_media: profile.socialLinks || [],
    };

    try {
      await updateUserInfo(updatedProfile).unwrap();
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  const handlePhotoAdd = (photo: string) => {
    dispatch(setPhotos([...profile.photos, photo]));
  };

  const handlePhotoClick = (photo: string) => {
    dispatch(setModalPhoto(photo));
    dispatch(setShowModal(true));
  };

  const handleSelectGender = (option: string) => {
    dispatch(setGender(option));
  };

  const updateAbout = (about: string) => {
    dispatch(setAbout(about));
  };

  if (isLoading || isFetching) {
    return <div>Загрузка...</div>;
  }

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
      <SelectGender safeGender={handleSelectGender} selectedGender={selectedGender} title={'Ваш пол:'} options={['Мужской', 'Женский']}/>
      <About updateAbout={updateAbout} title="О себе"></About>
      <Interests></Interests>
      <CoLifeSettings title="Co-Life"/>
      <SocialLinks/>
      <button className={styles.save_button} onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default ProfileSettings;
