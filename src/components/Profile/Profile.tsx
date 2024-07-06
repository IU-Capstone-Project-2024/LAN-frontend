"use client"

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/Profile/profile.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProfileInfo from "@/components/UniversalComponents/ProfileInfo/ProfileInfo";
import ProfileHeader from "@/components/UniversalComponents/ProfileHeader/ProfileHeader";
import {RootState} from "@/Store/store";
import {useSelector} from "react-redux";

const Profile: FC = () => {
  const router = useRouter();
  const [screenWidth] = useState<number>(0);
  const profile = useSelector((state: RootState) => state.profile);
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
        <ProfileHeader onAction={handleEditProfile}
                       photos={profile.photos}
                       iconAlt="Настройки"
                       iconSrc="/Settings_icon.svg"
                       title="Профиль"
                       width_icon={30}
                       height_icon={30}
        />
        <ProfileInfo screenWidth={screenWidth}
                     truncateLink={truncateLink}
                     coLife={profile.coLife}
                     about={profile.about}
                     interests={profile.interests}
                     name={profile.name}
                     age={profile.age}
                     religion={profile.religion}
                     socialLinks={profile.socialLinks}
        />
      </div>
  );
};

export default Profile;
