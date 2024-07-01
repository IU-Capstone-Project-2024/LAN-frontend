import React, { FC} from 'react';
import styles from '@/Styles/Profile/profileHeader.module.scss';
import CarouselElement from "@/components/Profile/CarouselElement/CarouselElement";
import Image from "next/image";

interface ProfileHeaderProps {
  onEditProfile: () => void;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ onEditProfile }) => {


  return (
      <div className={styles.header_container}>
        <div className={styles['header']}>
          <span>Профиль</span>
          <button className={styles['icon']} onClick={onEditProfile}>
            <Image src='/Settings_icon.svg' alt='Настройки' width={30} height={30} />
          </button>
        </div>
        <CarouselElement />
        <div className={styles['overlay']}></div>
      </div>
  );
};

export default ProfileHeader;
