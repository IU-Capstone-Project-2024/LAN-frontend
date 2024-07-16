"use client"

import React from 'react';
import Match from './Match/Match';
import Favorite from './Favorite/Favorite';

const FavoriteAndMatch: React.FC = () => {
  return (
      <div>
        <h2>Совпадения</h2>
        <Match/>
        <h2>Избранные</h2>
        <Favorite />
      </div>
  );
};

export default FavoriteAndMatch;
