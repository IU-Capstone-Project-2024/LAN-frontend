"use client"

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/Profile/profile.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProfileInfo from "@/components/Profile/ProfileInfo/ProfileInfo";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";

const Profile: FC = () => {
  const router = useRouter();
  const [screenWidth] = useState<number>(0);
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

  return (
      <div className={styles.profile}>
        <ProfileHeader onEditProfile={handleEditProfile}/>
        <ProfileInfo screenWidth={screenWidth} truncateLink={truncateLink}/>
      </div>
  );
};

export default Profile;
