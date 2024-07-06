import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { likeProfile, dislikeProfile, previousProfile } from '@/Store/slices/datingSlice';
import { addFavorite } from '@/Store/slices/favoritesSlice';
import {RootState} from "@/Store/store";
import styles from '@/Styles/Dating/ActionButtons.module.scss';

const ActionButtons: React.FC = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: RootState) => state.dating.profiles[state.dating.currentProfileIndex]);

  const handleAddFavorite = () => {
    if (currentProfile) {
      dispatch(addFavorite(currentProfile));
    }
  };

  return (
      <div className={styles.buttons}>
        <button onClick={() => dispatch(previousProfile())}>

        </button>
        <button onClick={() => dispatch(dislikeProfile())}>

        </button>
        <button onClick={() => dispatch(likeProfile())}>

        </button>
        <button onClick={handleAddFavorite}>

        </button>
      </div>
  );
};

export default ActionButtons;
