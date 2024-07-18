// src/components/GeneralSettings/LanguageSelector.tsx
"use client";

import React from 'react';
import styles from '../../Styles/SettingsPage/languageSelector.module.scss';
import { useTranslation } from 'react-i18next';
import Link from "next/link";
import Image from "next/image";

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
      <div className={styles.languageSelector}>
        <Link href="/settings" className={styles.backButton}>
          <Image src="/arrow_back.svg" alt="Back" width={24} height={24} layout="fixed"/>
          <h1>{t('language')}</h1>
        </Link>
        <div className={styles.languagesContainer}>
          <div
              className={`${styles.languageOption} ${i18n.language === 'ru' ? styles.selected : ''}`}
              onClick={() => handleLanguageChange('ru')}
          >
            {('Русский')}
            {i18n.language === 'ru' && <span className={styles.indicator}>●</span>}
          </div>
          <div
              className={`${styles.languageOption} ${i18n.language === 'en' ? styles.selected : ''}`}
              onClick={() => handleLanguageChange('en')}
          >
            {('English')}
            {i18n.language === 'en' && <span className={styles.indicator}>●</span>}
          </div>
        </div>
        
      </div>
  );
};

export default LanguageSelector;
