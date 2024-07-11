import { FC } from 'react';
import styles from '@/Styles/Universal/SelectGender.module.scss';
import { usePathname } from "next/navigation";

interface SelectSexProps {
  title: string;
  options: { value: string, label: string }[];
  safeGender: (option: string) => void;
  selectedGender: string;
}

const SelectGender: FC<SelectSexProps> = ({ title, options, safeGender, selectedGender }) => {
  const pathname = usePathname();
  const handleClick = (option: string) => () => {
    safeGender(option);
  };

  return (
    <div className={styles.container}>
      <label className={pathname === "/profile/settings" ? styles["contentProfileSettings"] : styles["title"]}>{title}</label>
      <div className={styles.buttonContainer}>
        {options.map((option, index) => (
          <span
            key={index}
            className={`${styles.button} ${selectedGender === option.value ? styles.selected : ''}`}
            onClick={handleClick(option.value)}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SelectGender;
