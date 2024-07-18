import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { setFavorites } from '@/Store/slices/favoritesSlice';
import styles from '@/Styles/FavoriteAndMatch/Favorite.module.scss'

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  useEffect(() => {
    fetch('/data/favorites.json')
      .then(response => response.json())
      .then(data => {
        dispatch(setFavorites(data));
      });
  }, [dispatch]);

  if (!favorites.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.favoritesContainer}>
      {favorites.map((favorite) => (
        <div key={favorite.id} className={styles.favoriteItem}>
          <img src={favorite.image} alt={favorite.name} className={styles.favoriteImage} />
          <div className={styles.favoriteDetails}>
            <p>{favorite.name}, {favorite.age}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
