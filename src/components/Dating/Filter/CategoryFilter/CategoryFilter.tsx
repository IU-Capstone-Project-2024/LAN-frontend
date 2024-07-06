import React, {FC, ChangeEvent, useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { setCategory } from '@/Store/slices/filterSlice';
import styles from '@/styles/Filter/CategoryFilter.module.scss';

const CategoryFilter: FC = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.filters.category);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value));
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
      <div className={styles['category-group']} ref={dropdownRef}>
        <div className={styles['header']} onClick={toggleDropdown}>
          <span>{ category ||'Выбор категории'}</span>
        </div>
        {isOpen && (
            <div className={styles['category-options']}>
              <label className={styles['category-option']}>
                Есть комната
                <input
                    type="radio"
                    name="category"
                    value="Есть комната"
                    checked={category === 'Есть комната'}
                    onChange={() => handleCategoryChange('Есть комната')}
                />
              </label>
              <label className={styles['category-option']}>
                Есть коллектив
                <input
                    type="radio"
                    name="category"
                    value="Есть коллектив"
                    checked={category === 'Есть коллектив'}
                    onChange={() => handleCategoryChange('Есть коллектив')}
                />
              </label>
              <label className={styles['category-option']}>
                Нигде не состоит
                <input
                    type="radio"
                    name="category"
                    value="Нигде не состоит"
                    checked={category === 'Нигде не состоит'}
                    onChange={() => handleCategoryChange('Нигде не состоит')}
                />
              </label>
            </div>
        )}
      </div>
  );
};

export default CategoryFilter;