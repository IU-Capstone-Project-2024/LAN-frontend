"use client";

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/Styles/Profile/profile.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProfileInfo from "@/components/UniversalComponents/ProfileInfo/ProfileInfo";
import ProfileHeader from "@/components/UniversalComponents/ProfileHeader/ProfileHeader";
import { RootState } from "@/Store/store";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserInfoQuery } from '@/Store/api/profileApi';
import { setProfile } from '@/Store/slices/profileSlice';

const Profile: FC = () => {
  const router = useRouter();
  const [screenWidth] = useState<number>(0);
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { data: userInfo, isLoading, error } = useGetUserInfoQuery({});

  useEffect(() => {
    if (userInfo) {
      const profileData = {
        photos: userInfo.photos || [],
        name: userInfo.first_name,
        age: calculateAge(userInfo.date_of_birth),
        gender: userInfo.sex,
        religion: userInfo.religion,
        about: userInfo.about,
        interests: userInfo.hobby,
        coLife: userInfo.metrics,
        socialLinks: userInfo.soc_media,
        showModal: false,
        modalPhoto: null,
      };

      dispatch(setProfile(profileData));
    }
  }, [userInfo, dispatch]);

  const handleEditProfile = () => {
    router.push('/profile/settings');
  };

  const truncateLink = (link: string) => {
    if (screenWidth <= 393) {
      return link.length > 27 ? `${link.slice(0, 27)}...` : link;
    } else {
      return link.length > 35 ? `${link.slice(0, 35)}...` : link;
    }
  };

  const calculateAge = (birthday: string): number => {
    const [day, month, year] = birthday.split('.').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки данных...</div>;
  }

  return (
    <div className={styles.profile}>
      <ProfileHeader 
        onAction={handleEditProfile}
        photos={userInfo.photo_url}
        iconAlt="Настройки"
        iconSrc="/Settings_icon.svg"
        title="Профиль"
        width_icon={30}
        height_icon={30}
      />
      <ProfileInfo 
        screenWidth={screenWidth}
        truncateLink={truncateLink}
        coLife={userInfo.metrics}
        about={profile.about}
        interests={profile.interests}
        name={profile.name}
        age={profile.age}
        gender={profile.gender}
        religion={profile.religion}
        socialLinks={profile.socialLinks}
      />
    </div>
  );
};

export default Profile;
