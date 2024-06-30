import { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoLife } from '@/Store/slices/profileSlice';
import { RootState } from '@/Store/store';
import styles from '@/Styles/ProfileSettings/coLifeSettings.module.scss';

const CoLifeSettings: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const handleCoLifeChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const value = Number(e.target.value);
    dispatch(setCoLife({ ...profile.coLife, [name]: value }));
  };

  return (
    <div className={styles['co-life']}>
      <label className={styles.title}>Co-Life</label>
      <div className={styles['co-life-options']}>
        <div className={styles['co-life-item']}>
          <input
            type="range"
            min="0"
            max="2"
            value={profile.coLife.nightOwl}
            onChange={(e) => handleCoLifeChange(e, 'nightOwl')}
          />
          <div className={styles.labels}>
            <span className={styles.leftLabel}>Сова</span>
            <span className={styles.rightLabel}>Жаворонок</span>
          </div>
        </div>
        <div className={styles['co-life-item']}>
          <input
            type="range"
            min="0"
            max="2"
            value={profile.coLife.cleanliness}
            onChange={(e) => handleCoLifeChange(e, 'cleanliness')}
          />
          <div className={styles.labels}>
            <span className={styles.leftLabel}>Чистота<br />важна</span>
            <span className={styles.rightLabel}>Чистота<br />не так важна</span>
          </div>
        </div>
        <div className={styles['co-life-item']}>
          <input
            type="range"
            min="0"
            max="2"
            value={profile.coLife.noiseLevel}
            onChange={(e) => handleCoLifeChange(e, 'noiseLevel')}
          />
          <div className={styles.labels}>
            <span className={styles.leftLabel}>Люблю тишину и покой</span>
            <span className={styles.rightLabel}>Люблю шум и компанию</span>
          </div>
        </div>
        <div className={styles['co-life-item']}>
          <input
            type="range"
            min="0"
            max="2"
            value={profile.coLife.alcohol}
            onChange={(e) => handleCoLifeChange(e, 'alcohol')}
          />
          <div className={styles.labels}>
            <span className={styles.leftLabel}>Пью алкоголь</span>
            <span className={styles.rightLabel}>Не пью</span>
          </div>
        </div>
        <div className={styles['co-life-item']}>
          <input
            type="range"
            min="0"
            max="2"
            value={profile.coLife.smoking}
            onChange={(e) => handleCoLifeChange(e, 'smoking')}
          />
          <div className={styles.labels}>
            <span className={styles.leftLabel}>Курю</span>
            <span className={styles.rightLabel}>Не курю</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoLifeSettings;
