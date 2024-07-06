import { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoLife } from '@/Store/slices/profileSlice';
import { RootState } from '@/Store/store';
import styles from '@/Styles/ProfileSettings/coLifeSettings.module.scss';
import RangeSlider from "@/components/UniversalComponents/RangeSlider/RangeSlider";

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
      <RangeSlider
        value={profile.coLife.nightOwl}
        leftLabel={'Сова'}
        rightLabel={'Жаворонок'}
        onChange={(e) => handleCoLifeChange(e, 'nightOwl')}/>
      <RangeSlider
          value={profile.coLife.cleanliness}
          leftLabel={'Чистота важна'}
          rightLabel={'Чистота не так важна'}
          onChange={(e) => handleCoLifeChange(e, 'cleanliness')}/>
      <RangeSlider
          value={profile.coLife.noiseLevel}
          leftLabel={'Люболю тинину и покой'}
          rightLabel={'Люблю шум и компанию'}
          onChange={(e) => handleCoLifeChange(e, 'noiseLevel')}/>
      <RangeSlider
          value={profile.coLife.alcohol}
          leftLabel={'Пью алкоголь'}
          rightLabel={'Не пью'}
          onChange={(e) => handleCoLifeChange(e, 'alcohol')}/>
      <RangeSlider
          value={profile.coLife.smoking}
          leftLabel={'Курю'}
          rightLabel={'Не курю'}
          onChange={(e) => handleCoLifeChange(e, 'smoking')}/>
    </div>
  );
};

export default CoLifeSettings;
