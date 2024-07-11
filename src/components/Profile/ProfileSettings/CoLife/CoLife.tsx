import { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoLife } from '@/Store/slices/profileSlice';
import { RootState } from '@/Store/store';
import styles from '@/Styles/Profile/ProfileSettings/coLifeSettings.module.scss';
import RangeSlider from "@/components/UniversalComponents/RangeSlider/RangeSlider";

interface CoLifeProps {
  title?: string;
}

const CoLifeSettings: FC<CoLifeProps> = ({title}) => {
  const dispatch = useDispatch();
  const coLifeSettings = useSelector((state: RootState) => state.profile.coLife);

  const handleCoLifeChange = (key: string, value: any) => {
    dispatch(setCoLife({ ...coLifeSettings, [key]: value }));
  };

  return (
    <div className={styles['co-life']}>
      <label className={styles.title}>{title}</label>
      <RangeSlider
        value={coLifeSettings.nightOwl}
        leftLabel={'Сова'}
        rightLabel={'Жаворонок'}
        onChange={(e) => handleCoLifeChange('nightOwl', Number(e.target.value))}/>
      <RangeSlider
          value={coLifeSettings.cleanliness}
          leftLabel={'Чистота важна'}
          rightLabel={'Чистота не так важна'}
          onChange={(e) => handleCoLifeChange('cleanliness', Number(e.target.value))}/>
      <RangeSlider
          value={coLifeSettings.noiseLevel}
          leftLabel={'Люболю тишину и покой'}
          rightLabel={'Люблю шум и компанию'}
          onChange={(e) => handleCoLifeChange('noiseLevel', Number(e.target.value))}/>
      <RangeSlider
          value={coLifeSettings.alcohol}
          leftLabel={'Пью алкоголь'}
          rightLabel={'Не пью'}
          onChange={(e) => handleCoLifeChange('alcohol', Number(e.target.value))}/>
      <RangeSlider
          value={coLifeSettings.smoking}
          leftLabel={'Курю'}
          rightLabel={'Не курю'}
          onChange={(e) => handleCoLifeChange('smoking', Number(e.target.value))}/>
    </div>
  );
};

export default CoLifeSettings;
