"use client"

import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/ProfileSettings/profileSettings.module.scss';
import { RootState } from "@/Store/store";
import UploadPhoto from "@/components/ProfileSettings/UploadPhoto/UploadPhoto";
import {
  setAge,
  setName,
  setReligion,
  setSocialLinks,
  updateSocialLink, addSocialLink, removeSocialLink
} from "@/Store/slices/profileSlice";
import ModalPhoto from "@/components/ProfileSettings/ModalPhoto/ModalPhoto";
import CoLifeSettings from "@/components/ProfileSettings/CoLife/CoLife";
import Interests from "@/components/ProfileSettings/Interests/Interests";
import About from "@/components/ProfileSettings/About/About";
import Image from "next/image";

const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

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
    router.push('/');
  };


  const handleSocialLinkChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(updateSocialLink({ index, link: e.target.value }));
  };

  const handleAddSocialLink = () => {
    dispatch(addSocialLink());
  };

  const handleRemoveSocialLink = (index: number) => {
    dispatch(removeSocialLink(index));
  };

  


  return (
    <div className={styles['profile-settings']}>
      <h2>Настройки профиля</h2>
      <UploadPhoto></UploadPhoto>
      <ModalPhoto show={profile.showModal}></ModalPhoto>
      <div className={styles.inputContainer}>
        <label>Имя</label>
        <input type="text" name="name" value={profileState.name} onChange={handleInputChange} placeholder='Имя' />
      </div>
      <div className={styles.ageAndReligion}>
        <div className={styles.ageContainer}>
          <label>Возраст:</label>
          <input type="text" name="age" value={profileState.age} onChange={handleInputChange} placeholder='25 лет' />
        </div>
        <div className={styles.religionContainer}>
          <label>Религия:</label>
          <input type="text" name="religion" value={profileState.religion} onChange={handleInputChange} placeholder='Атеист' />
        </div>
      </div>
      <About></About>
      <Interests></Interests>
      <CoLifeSettings />
      <div className={styles.label_soc_set}>
        <label>Соц. сети</label>
        {profile.socialLinks.map((link, index) => (
          <div key={index} className={styles['social-link']}>
            <input
              type="text"
              value={link}
              onChange={(e) => handleSocialLinkChange(e, index)}
            />
            <button className={styles.delete_button} type="button" onClick={() => handleRemoveSocialLink(index)}> <Image src={'/trash.svg'} alt={'Trash'} width={20} height={20}/> </button>
          </div>
        ))}
        <button className={styles.addButton} type="button" onClick={handleAddSocialLink}><Image src={'/add_new_social_media.svg'} alt={'Trash'} width={30} height={30}/></button>
      </div>
      <button className={styles.save_button} onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default ProfileSettings;