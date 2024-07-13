import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { setCoLife } from '@/Store/slices/profileSlice';
import { useAddMetricMutation, useUpdateMetricMutation } from '@/Store/api/metricsApi';
import styles from '@/Styles/Profile/ProfileSettings/coLifeSettings.module.scss';
import RangeSlider from "@/components/UniversalComponents/RangeSlider/RangeSlider";
import { CoLifePreferences } from '@/Types/types';

interface CoLifeProps {
  title?: string;
}

const CoLifeSettings: React.FC<CoLifeProps> = ({ title }) => {
  const dispatch = useDispatch();
  const coLifeSettings = useSelector((state: RootState) => state.profile.coLife);
  const [addMetric] = useAddMetricMutation();
  const [updateMetric] = useUpdateMetricMutation();

  useEffect(() => {
    Object.keys(coLifeSettings).forEach(async (key) => {
      const metric = coLifeSettings[key as keyof CoLifePreferences];
      try {
        await addMetric(metric).unwrap();
      } catch (error) {
        console.error('Failed to add metric:', error);
      }
    });
  }, [coLifeSettings, addMetric, dispatch]);

  const handleCoLifeChange = async (key: keyof CoLifePreferences, value: number) => {
    const metric = coLifeSettings[key];
    const updatedMetric = { ...metric, value };

    dispatch(setCoLife({ [key]: updatedMetric }));

    try {
      await updateMetric(updatedMetric).unwrap();
    } catch (error) {
      console.error('Failed to save metric:', error);
    }
  };

  return (
    <div className={styles['co-life']}>
      <label className={styles.title}>{title}</label>
      <RangeSlider
        value={coLifeSettings.nightOwl.value}
        leftLabel={'Сова'}
        rightLabel={'Жаворонок'}
        onChange={(e) => handleCoLifeChange('nightOwl', Number(e.target.value))} />
      <RangeSlider
        value={coLifeSettings.cleanliness.value}
        leftLabel={'Чистота важна'}
        rightLabel={'Чистота не так важна'}
        onChange={(e) => handleCoLifeChange('cleanliness', Number(e.target.value))} />
      <RangeSlider
        value={coLifeSettings.noiseLevel.value}
        leftLabel={'Люблю тишину и покой'}
        rightLabel={'Люблю шум и компанию'}
        onChange={(e) => handleCoLifeChange('noiseLevel', Number(e.target.value))} />
      <RangeSlider
        value={coLifeSettings.alcohol.value}
        leftLabel={'Пью алкоголь'}
        rightLabel={'Не пью'}
        onChange={(e) => handleCoLifeChange('alcohol', Number(e.target.value))} />
      <RangeSlider
        value={coLifeSettings.smoking.value}
        leftLabel={'Курю'}
        rightLabel={'Не курю'}
        onChange={(e) => handleCoLifeChange('smoking', Number(e.target.value))} />
    </div>
  );
};

export default CoLifeSettings;
