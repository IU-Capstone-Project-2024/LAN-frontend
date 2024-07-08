"use client"

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/Styles/Auth/Step1.module.scss';
import UploadPhoto from "@/components/UniversalComponents/UploadPhoto/UploadPhoto";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/Store/store";
import {setModalPhoto, setName, setPhotos, setReligion, setShowModal} from "@/Store/slices/profileSlice";
import ModalPhoto from "@/components/ProfileSettings/ModalPhoto/ModalPhoto";
import BirthdayInput from "@/components/UniversalComponents/BirthdayInput/BirthdayInput";

const Step1: React.FC = () => {
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    router.push('/auth/step_2');
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  }

  const handleReligionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setReligion(e.target.value));
  }


  return (
      <div className={styles.container}>
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
        <ModalPhoto show={profile.showModal}/>
        <div className={styles["Name"]}>
          <span className={styles["span"]}>Как вас зовут?</span>
          <input type="text" placeholder="Ваше имя" name="name" value={profile.name} onChange={handleNameChange}/>
        </div>
        <div className={styles.Birthday}>
          <BirthdayInput title='Дата рождения:'/>
        </div>
        <div className={styles["Religion"]}>
          <span className={styles["span"]}>Ваша религия<p>(необязательно)</p></span>
          <input type="text" placeholder="Атеист" name="religion" value={profile.religion} onChange={handleReligionChange}/>
        </div>
        <button className={styles["button"]} onClick={nextStep}>Далее</button>
      </div>
  );
};

export default Step1;
