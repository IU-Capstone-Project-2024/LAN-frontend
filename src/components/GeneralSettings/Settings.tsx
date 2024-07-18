// src/app/settings/page.tsx
"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/Store/store";
import { clearToken } from '@/Store/slices/authSlice';
import { useRouter } from 'next/navigation';
import styles from '../../Styles/SettingsPage/settingsPage.module.scss';
import Image from "next/image";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t } = useTranslation();
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
        <Image src="/arrow_back.svg" alt="Back" width={24} height={24} layout="fixed" />
        <h1 className={styles.headerTitle}>{t('appSettings')}</h1>
      </Link>
      <div className={styles.profile}>
        <img src={profile.photos[0]} alt={profile.name} className={styles.profileImage} />
        <div className={styles.profileName}>{profile.name}</div>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link href="/settings/theme-selector" className={`${styles.menuLink} ${styles.noLinkStyle}`}>
            <span className={styles.menuText}>{t('themeSettings')}</span>
            <div className={styles.arrow}></div>
          </Link>
        </li>
        <li>
          <span className={styles.menuText}>{t('notificationSettings')}</span>
          <div className={styles.arrow}></div>
        </li>
        <li>
          <Link href="/settings/language-selector" className={`${styles.menuLink} ${styles.noLinkStyle}`}>
            <span className={styles.menuText}>{t('language')}</span>
            <div className={styles.arrow}></div>
          </Link>
        </li>
        <li>
          <span className={styles.menuText}>{t('faq')}</span>
          <div className={styles.arrow}></div>
        </li>
        <li>
          <span className={styles.menuText}>{t('reportProblem')}</span>
          <div className={styles.arrow}></div>
        </li>
        <li>
          <button onClick={handleLogout}>{t('logout')}</button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsPage;
