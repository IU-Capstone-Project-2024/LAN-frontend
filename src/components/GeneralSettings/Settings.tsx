"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/Store/store";
import { clearToken } from '@/Store/slices/authSlice';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/SettingsPage/settingsPage.module.scss';
import Image from "next/image";
import Link from 'next/link';

const SettingsPage = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearToken());
    router.push('/auth/step_1');
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        <Image src="arrow_back.svg" alt="Back" width={24} height={24} layout="fixed" />
        <h1 className={styles.headerTitle}>Настройка приложения</h1>
      </Link>
      <div className={styles.profile}>
        <img src={profile.photos[0]} alt={profile.name} className={styles.profileImage} />
        <div className={styles.profileName}>{profile.name}</div>
      </div>
      <ul className={styles.menu}>
        <li>
          <span className={styles.menuText}>Тема приложения</span>
          <div className={styles.arrow}></div>
        </li>
        <li>
          <span className={styles.menuText}>Настройка уведомлений</span>
          <div className={styles.arrow}></div>
        </li>
        <li>
          <span className={styles.menuText}>Язык</span>
          <div className={styles.arrow}></div>
        </li>
        <li>
          <span className={styles.menuText}>FAQ</span>
          <div className={styles.arrow}></div>
        </li>
        <li>
          <span className={styles.menuText}>Сообщить о проблеме</span>
          <div className={styles.arrow}></div>
        </li>
        <li>
          <button onClick={handleLogout}>Выйти</button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsPage;