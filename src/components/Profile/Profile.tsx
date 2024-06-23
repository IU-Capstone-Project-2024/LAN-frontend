"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/Profile/profile.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselElement from "@/components/Profile/CarouselElement/CarouselElement";
import ReadOnlySlider from "@/components/Profile/ReadOnlySlider/ReadOnlySlider";

const Profile: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/profile_settings');
  };

  return (
      <div className={styles.profile}>
        <div className={styles['header-container']}>
          <div className={styles['header']}>Профиль</div>
          <CarouselElement/>
        </div>
        <h1>{profile.name}</h1>
        <p className={styles['age']}>{profile.age} лет | {profile.religion}</p>
        <div className={styles["about"]}>
          <h2>О себе</h2>
          <p>{profile.about}</p>
        </div>
        <div className={styles["interests"]}>
          <h2>Интересы</h2>
          <div className={styles["interests-list"]}>
            {profile.interests.map((interest, index) => (
                <span key={index}>{interest}</span>
            ))}
          </div>
        </div>
        <div className={styles["co-life"]}>
          <h2>Co-Life</h2>
          <ReadOnlySlider labelStart="Сова" labelEnd="Жаворонок" value={profile.coLife.nightOwl} max={2} />
          <ReadOnlySlider labelStart="Чистота важна" labelEnd="Чистота не так важна" value={profile.coLife.cleanliness} max={2} />
          <ReadOnlySlider labelStart="Люблю тишину и покой" labelEnd="Люблю шум и компанию" value={profile.coLife.noiseLevel} max={2} />
          <ReadOnlySlider labelStart="Пью алкоголь" labelEnd="Не пью" value={profile.coLife.alcohol} max={2} />
          <ReadOnlySlider labelStart="Курю" labelEnd="Не курю" value={profile.coLife.smoking} max={2} />
        </div>
        <div className={styles["social-links"]}>
          <h2>Соц. сети</h2>
          {profile.socialLinks.map((link, index) => (
              <a href={link} key={index}>{link}</a>
          ))}
        </div>
        <button onClick={handleEditProfile}>Редактировать профиль</button>
      </div>
  );
};

export default Profile;