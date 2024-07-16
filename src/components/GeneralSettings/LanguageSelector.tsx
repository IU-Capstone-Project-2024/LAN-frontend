// src/components/GeneralSettings/LanguageSelector.tsx
"use client";

import React from 'react';
import styles from '../../Styles/SettingsPage/languageSelector.module.scss';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={styles.languageSelector}>
      <h1>{t('language')}</h1>
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
  );
};

export default LanguageSelector;
