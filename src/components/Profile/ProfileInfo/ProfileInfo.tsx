import React, {FC} from 'react';
import styles from '@/Styles/Profile/profileInfo.module.scss';
import ReadOnlySlider from "@/components/Profile/ReadOnlySlider/ReadOnlySlider";
import {useSelector} from "react-redux";
import {RootState} from "@/Store/store";

interface ProfileDetailsProps {
  screenWidth: number;
  truncateLink: (link: string) => string;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({ truncateLink }) => {
  const profile = useSelector((state: RootState) => state.profile);

  const defaultAge = 'Возраст не указан';
  const defaultReligion = 'Религия не указана';

  const renderAgeReligion = () => {
    const age = profile.age || defaultAge;
    const religion = profile.religion || defaultReligion;

    if (!profile.age && !profile.religion) {
      return <p className={styles['age']}>0 лет</p>;
    }

    if (profile.age && !profile.religion) {
      return <p className={styles['age']}>{age} лет</p>;
    }

    return <p className={styles['age']}>{age} лет | {religion}</p>;
  };

  return (
      <div className={styles.details_container}>
        <span className={styles["span"]}></span>
        {profile.name ? (
            <h1>{profile.name}</h1>
        ) : (
            <h1>Имя</h1>
        )}
        {renderAgeReligion()}
        {profile.about && (
            <div className={styles["about"]}>
              <h2>О себе</h2>
              <p>{profile.about}</p>
            </div>
        )}
        {profile.interests.length > 0 && (
            <div className={styles["interests"]}>
              <h2>Интересы</h2>
              <div className={styles["interests-list"]}>
                {profile.interests.map((interest, index) => (
                    <span key={index}>{interest}</span>
                ))}
              </div>
            </div>
        )}
        <div className={styles["co-life"]}>
          <h2>Co-Life</h2>
          <ReadOnlySlider labelStart="Сова" labelEnd="Жаворонок" value={profile.coLife.nightOwl} max={2} />
          <ReadOnlySlider labelStart="Чистота важна" labelEnd="Чистота не так важна" value={profile.coLife.cleanliness} max={2} />
          <ReadOnlySlider labelStart="Люблю тишину и покой" labelEnd="Люблю шум и компанию" value={profile.coLife.noiseLevel} max={2} />
          <ReadOnlySlider labelStart="Пью алкоголь" labelEnd="Не пью" value={profile.coLife.alcohol} max={2} />
          <ReadOnlySlider labelStart="Курю" labelEnd="Не курю" value={profile.coLife.smoking} max={2} />
        </div>
        {profile.socialLinks.length > 0 && (
            <div className={styles["social-links"]}>
              <h2>Соц. сети</h2>
              <ul>
                {profile.socialLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {truncateLink(link)}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
};

export default ProfileDetails;
