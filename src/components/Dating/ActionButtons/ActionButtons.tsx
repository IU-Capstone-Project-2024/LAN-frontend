import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { likeProfile, dislikeProfile, previousProfile } from '@/Store/slices/datingSlice';
import { addFavorite } from '@/Store/slices/favoritesSlice';
import {RootState} from "@/Store/store";
import styles from '@/Styles/Dating/ActionButtons.module.scss';
import Image from "next/image";

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
        <Image onClick={() => dispatch(previousProfile())} src={"/dating/previous.svg"} alt={"previous"} width={59} height={59}/>
        <Image onClick={() => dispatch(dislikeProfile())} src={"/dating/dislike.svg"} alt={"previous"} width={59} height={59}/>
        <Image onClick={() => dispatch(likeProfile())} src={"/dating/like.svg"} alt={"previous"} width={59} height={59}/>
        <Image onClick={handleAddFavorite} src={"/dating/favorite.svg"} alt={"previous"} width={59} height={59}/>
      </div>
  );
};

export default ActionButtons;
