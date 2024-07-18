import React, { FC} from 'react';
import styles from '@/Styles/Universal/profileHeader.module.scss';
import CarouselElement from "@/components/UniversalComponents/CarouselElement/CarouselElement";
import Image from "next/image";

interface ProfileHeaderProps {
  title: string;
  photos: string[];
  iconSrc: string;
  iconAlt: string;
  onAction: () => void;
  width_icon: number;
  height_icon: number;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ title, photos, iconSrc, iconAlt, onAction, width_icon, height_icon}) => {
  return (
      <div className={styles.header_container}>
        <div className={styles['header']}>
          <span>{title}</span>
          <button className={styles['icon']} onClick={onAction}>
            <Image src={iconSrc} alt={iconAlt} width={width_icon} height={height_icon} />
          </button>
        </div>
        <CarouselElement photos={photos} />
        <div className={styles['overlay']}></div>
      </div>
  );
};

export default ProfileHeader;
