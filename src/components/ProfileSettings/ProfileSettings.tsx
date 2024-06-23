"use client"

import React, {useState, ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/ProfileSettings/profileSettings.module.scss';
import {RootState} from "@/Store/store";
import UploadPhoto from "@/components/ProfileSettings/UploadPhoto/UploadPhoto";
import {setAbout, setAge, setName, setReligion, setSocialLinks, setInterests} from "@/Store/slices/profileSlice";
import ModalPhoto from "@/components/ProfileSettings/ModalPhoto/ModalPhoto";
import CoLifeSettings from "@/components/ProfileSettings/CoLife/CoLife";

const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const interestsOptions = ['Музыка', 'Спорт', 'Книги', 'Социальная жизнь', 'Животные', 'Бизнес', 'Саморазвитие'];

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
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'about') {
      dispatch(setAbout(value));
    }
  };

  const handleSave = () => {
    router.push('/');
  };

  const handleInterestClick = (interest: string) => {
    let updatedInterests = [...profile.interests];
    if (updatedInterests.includes(interest)) {
      updatedInterests = updatedInterests.filter((i) => i !== interest);
    } else {
      if (updatedInterests.length < 3) {
        updatedInterests.push(interest);
      }
    }
    dispatch(setInterests(updatedInterests));
  };


  return (
      <div className={styles['profile-settings']}>
        <h2>Настройки профиля</h2>
        <UploadPhoto></UploadPhoto>
        <ModalPhoto show={profile.showModal}></ModalPhoto>
        <div>
          <label>Имя</label>
          <input type="text" name="name" value={profileState.name} onChange={handleInputChange}/>
        </div>
        <div>
          <div>
            <label>Возраст</label>
            <input type="text" name="age" value={profileState.age} onChange={handleInputChange}/>
          </div>
          <div>
            <label>Религия</label>
            <input type="text" name="religion" value={profileState.religion} onChange={handleInputChange}/>
          </div>
        </div>
        <div>
          <label>О себе</label>
          <textarea name="about" value={profileState.about} onChange={handleTextareaChange}/>
        </div>
        <div className={styles['interests']}>
          <label>Интересы (выберите от 3-х)</label>
          <div className={styles['interests-options']}>
            {interestsOptions.map((interest) => (
                <button
                    key={interest}
                    className={profile.interests.includes(interest) ? styles['selected'] : ''}
                    onClick={() => handleInterestClick(interest)}
                >
                  {interest}
                </button>
            ))}
          </div>
        </div>
        <CoLifeSettings />
        <div>
          <label>Соц. сети</label>
          <input type="text" name="socialLinks" value={profileState.socialLinks[0]} onChange={handleInputChange}/>
        </div>
        <button onClick={handleSave}>Сохранить</button>
      </div>
  );
};

export default ProfileSettings;