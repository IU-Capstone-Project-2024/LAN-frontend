import React, { ChangeEvent, FC, useState, useEffect } from 'react';
import styles from '@/Styles/Profile/ProfileSettings/about.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { setAbout } from '@/Store/slices/profileSlice';

interface AboutProps{
  title:string
  updateAbout: (about: string) => void;
}

const About: FC<AboutProps> = ({title, updateAbout }) => {
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
    updateAbout(value);
  };

  return (
      <div className={styles.aboutContainer}>
        <label>{title}</label>
        <textarea
            name="about"
            value={profileState.about}
            onChange={handleTextareaChange}
            placeholder="Меня зовут Кира Йошикагэ"
        />
      </div>
  );
};

export default About;
