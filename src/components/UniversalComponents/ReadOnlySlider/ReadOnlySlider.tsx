import { FC } from 'react';
import styles from '@/Styles/Universal/ReadOnlySlider.module.scss';

interface ReadOnlySliderProps {
  labelStart: string;
  labelEnd: string;
  value: number;
  min: number;
  max: number;
}

const ReadOnlySlider: FC<ReadOnlySliderProps> = ({ labelStart, labelEnd, value, min, max }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
      <div className={styles['slider-container']}>
        <div className={styles['slider-track']} />
        <div className={styles['slider-thumb']} style={{ left: `${percentage}%` }} />
        <div className={styles['slider-labels']}>
          <span className={styles['start']}>{labelStart}</span>
          <span className={styles['end']}>{labelEnd}</span>
        </div>
      </div>
  );
};

export default ReadOnlySlider;
