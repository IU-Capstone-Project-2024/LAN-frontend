import React, {FC} from 'react';
import styles from '@/Styles/Universal/profileInfo.module.scss';
import ReadOnlySlider from "@/components/UniversalComponents/ReadOnlySlider/ReadOnlySlider";

interface CoLife {
  nightOwl: number;
  cleanliness: number;
  noiseLevel: number;
  alcohol: number;
  smoking: number;
}

interface ProfileDetailsProps {
  name?: string;
  age: number;
  gender: string;
  religion?: string;
  about?: string;
  interests?: string[] | null;
  coLife: CoLife;
  socialLinks: string[] | null;
  truncateLink: (link: string) => string;
  screenWidth: number;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({
                                                   name = 'Имя',
                                                   age,
                                                   gender,
                                                   religion,
                                                   about,
                                                   interests = [],
                                                   coLife,
                                                   socialLinks = [],
                                                   truncateLink,
                                                 }) => {
  const defaultAge = 'Возраст не указан';
  const defaultReligion = 'Религия не указана';

  const renderAgeReligion = () => {
    const displayAge = age || defaultAge;
    const displayReligion = religion || defaultReligion;
    const displayGender = gender

    if (!age && !religion) {
      return <p className={styles['age']}>0 лет | {displayGender}</p>;
    }

    if (age && !religion) {
      return <p className={styles['age']}>{displayAge} лет | {displayGender}</p>;
    }

    return <p className={styles['age']}>{displayAge} лет | {displayGender} | {displayReligion}</p>;
  };

  return (
      <div className={styles.details_container}>
        <span className={styles["span"]}></span>
        {name ? (
            <h1>{name}</h1>
        ):(
            <h1>Депрессия</h1>
        )}

        {renderAgeReligion()}
        {about && (
            <div className={styles["about"]}>
              <h2>О себе</h2>
              <p>{about}</p>
            </div>
        )}
        {interests && interests.length > 0 && (
            <div className={styles["interests"]}>
              <h2>Интересы</h2>
              <div className={styles["interests-list"]}>
                {interests.map((interest, index) => (
                    <span key={index}>{interest}</span>
                ))}
              </div>
            </div>
        )}
        <div className={styles["co-life"]}>
          <h2>Co-Life</h2>
          <ReadOnlySlider labelStart="Сова" labelEnd="Жаворонок" value={coLife.nightOwl} min={-1} max={1} />
          <ReadOnlySlider labelStart="Чистота важна" labelEnd="Чистота не так важна" value={coLife.cleanliness} min={-1} max={1} />
          <ReadOnlySlider labelStart="Люблю тишину и покой" labelEnd="Люблю шум и компанию" value={coLife.noiseLevel} min={-1} max={1} />
          <ReadOnlySlider labelStart="Пью алкоголь" labelEnd="Не пью" value={coLife.alcohol} min={-1} max={1} />
          <ReadOnlySlider labelStart="Курю" labelEnd="Не курю" value={coLife.smoking} min={-1} max={1} />
        </div>
        {socialLinks && socialLinks.length > 0 && (
            <div className={styles["social-links"]}>
              <h2>Соц. сети</h2>
              <ul>
                {socialLinks.map((link, index) => (
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
