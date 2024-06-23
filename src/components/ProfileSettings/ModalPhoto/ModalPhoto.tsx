import {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from '@/Styles/ProfileSettings/modal.module.scss';
import {
  removePhoto,
  setMainPhoto,
  setShowModal,
  setModalPhoto,
} from '@/Store/slices/profileSlice';
import {RootState} from "@/Store/store";


interface ModalProps {
  show: boolean;
}

const ModalPhoto: FC<ModalProps> = ({show}) => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  if (!show) {
    return null;
  }

  const handleSetMainPhoto = () => {
    if (profile.modalPhoto) {
      dispatch(setMainPhoto(profile.modalPhoto));
      dispatch(setShowModal(false));
      dispatch(setModalPhoto(null));
    }
  };

  const handleRemovePhoto = () => {
    if (profile.modalPhoto) {
      dispatch(removePhoto(profile.modalPhoto));
      dispatch(setShowModal(false));
      dispatch(setModalPhoto(null));
    }
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
    dispatch(setModalPhoto(null));
  };

  return (
      <>
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <h3>Выберите действие</h3>
            <button onClick={handleSetMainPhoto}>Сделать главным</button>
            <button onClick={handleRemovePhoto}>Удалить</button>
            <button onClick={handleCloseModal}>Отмена</button>
          </div>
        </div>
      </>
  );
};


export default ModalPhoto;