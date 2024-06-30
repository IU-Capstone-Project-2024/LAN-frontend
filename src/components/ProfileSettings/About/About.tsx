import React, { ChangeEvent, FC, useState, useEffect, useRef } from 'react';
import styles from '@/Styles/ProfileSettings/about.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { setAbout } from '@/Store/slices/profileSlice';

const About: FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [profileState, setProfileState] = useState({
    about: profile.about,
  });

  useEffect(() => {
    setProfileState(profile);
  }, [profile]);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setProfileState(prevState => ({
      ...prevState,
      about: value,
    }));
    dispatch(setAbout(value));
  };

  return (
      <div className={styles.aboutContainer}>
        <label>О себе</label>
        <textarea
            name="about"
            value={profileState.about}
            onChange={handleTextareaChange}
            placeholder="Меня зовут Кира Йошикагэ. Мне 33 года. Мой дом находится в северо-восточной части Морио, в районе поместий. Работаю до утра сплю без особых проблем. Утром я просыпаюсь, не чувствуя ни усталости, ни стресса."
        />
      </div>
  );
};

export default About;
