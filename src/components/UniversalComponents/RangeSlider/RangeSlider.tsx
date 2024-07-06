import { ChangeEvent, FC } from 'react';
import styles from '@/Styles/Universal/RangeSlider.module.scss';

interface RangeSliderProps {
  value: number;
  leftLabel: string;
  rightLabel: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RangeSlider: FC<RangeSliderProps> = ({ value, leftLabel, rightLabel, onChange }) => {
  return (
      <div className={styles.range_slider}>
        <input
            type="range"
            min={-1}
            max={1}
            value={value}
            onChange={onChange}
        />
        <div className={styles.labels}>
          <span className={styles.leftLabel}>{leftLabel}</span>
          <span className={styles.rightLabel}>{rightLabel}</span>
        </div>
      </div>
  );
};

export default RangeSlider;
