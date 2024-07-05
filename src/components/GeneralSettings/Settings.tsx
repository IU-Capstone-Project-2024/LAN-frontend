// src/components/SettingsPage.tsx
"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/Store/store";
import styles from '../../Styles/SettingsPage/settingsPage.module.scss';
import Image from "next/image";
import Link from 'next/link';

const SettingsPage = () => {
  const profileName = useSelector((state: RootState) => state.profile.name);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        <Image src="arrow_back.svg" alt="Back" width={24} height={24} layout="fixed" />
        <h1 className={styles.headerTitle}>Настройка приложения</h1>
      </Link>
      <div className={styles.profile}>
        <img src="/path_to_profile_image.jpg" alt={profileName} className={styles.profileImage} />
        <div className={styles.profileName}>{profileName}Anastasia</div>
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
      </ul>
    </div>
  );
};

export default SettingsPage;
