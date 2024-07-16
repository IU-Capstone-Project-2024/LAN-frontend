"use client";
import React, { useState } from 'react';
import styles from '../../Styles/SettingsPage/ThemeSelector.module.scss';

type Theme = 'light' | 'dark' | 'custom';

const ThemeSelector: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('light');

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Тема приложения</h1>
      </div>
      <div className={styles.themeOptions}>
        <div className={`${styles.option} ${selectedTheme === 'light' ? styles.selected : ''}`} onClick={() => handleThemeChange('light')}>
          <img src="/light_theme.svg" alt="Светлая тема" className={styles.icon} />
          <span>Светлая</span>
          {selectedTheme === 'light' && <div className={styles.indicator}></div>}
        </div>
        <div className={`${styles.option} ${selectedTheme === 'dark' ? styles.selected : ''}`} onClick={() => handleThemeChange('dark')}>
          <img src="/dark_theme.svg" alt="Темная тема" className={styles.icon} />
          <span>Темная</span>
          {selectedTheme === 'dark' && <div className={styles.indicator}></div>}
        </div>
        <div className={`${styles.option} ${selectedTheme === 'custom' ? styles.selected : ''}`} onClick={() => handleThemeChange('custom')}>
          <img src="/dark_light_theme.svg" alt="Пользовательская тема" className={styles.icon} />
          <span>Системная</span>
          {selectedTheme === 'custom' && <div className={styles.indicator}></div>}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
