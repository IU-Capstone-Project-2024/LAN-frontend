"use client"

import React from 'react';
import Match from './Match/Match';
import Favorite from './Favorite/Favorite';
import styles from '@/Styles/FavoriteAndMatch/FavoriteAndMatch.module.scss'

const FavoriteAndMatch: React.FC = () => {
  return (
      <div className={styles.container}>
        <h2 className={styles['match']}>Совпадения</h2>
        <Match/>
        <h2 className={styles['favorite']}>Избранные</h2>
        <Favorite />
      </div>
  );
};

export default FavoriteAndMatch;
