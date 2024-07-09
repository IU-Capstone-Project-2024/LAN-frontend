import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/Store/store";
import {
  setInterests,
} from "@/Store/slices/profileSlice";
import styles from "@/Styles/Profile/ProfileSettings/interests.module.scss"


const Interests: FC = () => {

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const interestsOptions = ['Музыка', 'Спорт', 'Книги', 'Социальная жизнь', 'Животные', 'Бизнес', 'Саморазвитие'];


  const handleInterestClick = (interest: string) => {
    let updatedInterests = [...profile.interests];
    if (updatedInterests.includes(interest)) {
      updatedInterests = updatedInterests.filter((i) => i !== interest);
    } else {
      if (updatedInterests.length < 3) {
        updatedInterests.push(interest);
      }
    }
    dispatch(setInterests(updatedInterests));
  };

  return (
      <>
        <div className={styles['interests']}>
          <label>Интересы (выберите от 3-х)</label>
          <div className={styles['interests-options']}>
            {interestsOptions.map((interest) => (
                <button
                    key={interest}
                    className={profile.interests.includes(interest) ? styles['selected'] : ''}
                    onClick={() => handleInterestClick(interest)}
                >
                  {interest}
                </button>
            ))}
          </div>
        </div>
      </>
  );
};

export default Interests;