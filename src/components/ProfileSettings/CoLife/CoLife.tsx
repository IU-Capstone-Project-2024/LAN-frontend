import {ChangeEvent, FC} from 'react';
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
        <label>Co-Life</label>
        <div className={styles['co-life-options']}>
          <div className={styles['co-life-item']}>
            <label>Сова - Жаворонок</label>
            <input
                type="range"
                min="0"
                max="2"
                value={profile.coLife.nightOwl}
                onChange={(e) => handleCoLifeChange(e, 'nightOwl')}
            />
          </div>
          <div className={styles['co-life-item']}>
            <label>Чистота важна</label>
            <input
                type="range"
                min="0"
                max="2"
                value={profile.coLife.cleanliness}
                onChange={(e) => handleCoLifeChange(e, 'cleanliness')}
            />
          </div>
          <div className={styles['co-life-item']}>
            <label>Люблю тишину и покой</label>
            <input
                type="range"
                min="0"
                max="2"
                value={profile.coLife.noiseLevel}
                onChange={(e) => handleCoLifeChange(e, 'noiseLevel')}
            />
          </div>
          <div className={styles['co-life-item']}>
            <label>Пью алкоголь</label>
            <input
                type="range"
                min="0"
                max="2"
                value={profile.coLife.alcohol}
                onChange={(e) => handleCoLifeChange(e, 'alcohol')}
            />
          </div>
          <div className={styles['co-life-item']}>
            <label>Курю</label>
            <input
                type="range"
                min="0"
                max="2"
                value={profile.coLife.smoking}
                onChange={(e) => handleCoLifeChange(e, 'smoking')}
            />
          </div>
        </div>
      </div>
  );
};

export default CoLifeSettings;
