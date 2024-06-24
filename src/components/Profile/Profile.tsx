"use client"

import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/Profile/profile.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselElement from "@/components/Profile/CarouselElement/CarouselElement";
import ReadOnlySlider from "@/components/Profile/ReadOnlySlider/ReadOnlySlider";
import Image from "next/image";

const Profile: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const handleEditProfile = () => {
    router.push('/profile_settings');
  };

  const truncateLink = (link: string) => {
    if (screenWidth <= 393) {
      return link.length > 27 ? `${link.slice(0, 27)}...` : link;
    } else {
      return link.length > 35 ? `${link.slice(0, 35)}...` : link;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);

      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
      <div className={styles.profile}>
        <div className={styles['header-container']}>
          <div className={styles['header']}>
            <span>
              Профиль
            </span>
            <button className={styles['icon']} onClick={handleEditProfile}>
              <Image src='/Settings_icon.svg' alt='Настройки' width={30} height={30} />
            </button>
          </div>
          <CarouselElement/>
        </div>
        <h1>{profile.name}</h1>
        <p className={styles['age']}>{profile.age} лет | {profile.religion}</p>
        { profile.about && (
            <div className={styles["about"]}>
              <h2>О себе</h2>
              <p>{profile.about}</p>
            </div>
        )}
        { profile.interests.length > 0 && (
            <div className={styles["interests"]}>
              <h2>Интересы</h2>
              <div className={styles["interests-list"]}>
                {profile.interests.map((interest, index) => (
                    <span key={index}>{interest}</span>
                ))}
              </div>
            </div>
        )}
        <div className={styles["co-life"]}>
          <h2>Co-Life</h2>
          <ReadOnlySlider labelStart="Сова" labelEnd="Жаворонок" value={profile.coLife.nightOwl} max={2}/>
          <ReadOnlySlider labelStart="Чистота важна" labelEnd="Чистота не так важна" value={profile.coLife.cleanliness} max={2} />
          <ReadOnlySlider labelStart="Люблю тишину и покой" labelEnd="Люблю шум и компанию" value={profile.coLife.noiseLevel} max={2} />
          <ReadOnlySlider labelStart="Пью алкоголь" labelEnd="Не пью" value={profile.coLife.alcohol} max={2} />
          <ReadOnlySlider labelStart="Курю" labelEnd="Не курю" value={profile.coLife.smoking} max={2} />
        </div>
        { profile.socialLinks.length > 0 && (
            <div className={styles["social-links"]}>
              <h2>Соц. сети</h2>
              <ul>
                {profile.socialLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {truncateLink(link)}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
};

export default Profile;