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
  age?: number;
  religion?: string;
  about?: string;
  interests?: string[];
  coLife: CoLife;
  socialLinks: string[];
  truncateLink: (link: string) => string;
  screenWidth: number;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({
                                                   name = 'Имя',
                                                   age,
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

    if (!age && !religion) {
      return <p className={styles['age']}>0 лет</p>;
    }

    if (age && !religion) {
      return <p className={styles['age']}>{displayAge} лет</p>;
    }

    return <p className={styles['age']}>{displayAge} лет | {displayReligion}</p>;
  };

  return (
      <div className={styles.details_container}>
        <span className={styles["span"]}></span>
        {about ? (
            <h1>{name}</h1>
        ):(
            <h1>Имя</h1>
        )}

        {renderAgeReligion()}
        {about && (
            <div className={styles["about"]}>
              <h2>О себе</h2>
              <p>{about}</p>
            </div>
        )}
        {interests.length > 0 && (
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
          <ReadOnlySlider labelStart="Сова" labelEnd="Жаворонок" value={coLife.nightOwl} max={2} />
          <ReadOnlySlider labelStart="Чистота важна" labelEnd="Чистота не так важна" value={coLife.cleanliness} max={2} />
          <ReadOnlySlider labelStart="Люблю тишину и покой" labelEnd="Люблю шум и компанию" value={coLife.noiseLevel} max={2} />
          <ReadOnlySlider labelStart="Пью алкоголь" labelEnd="Не пью" value={coLife.alcohol} max={2} />
          <ReadOnlySlider labelStart="Курю" labelEnd="Не курю" value={coLife.smoking} max={2} />
        </div>
        {socialLinks.length > 0 && (
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
