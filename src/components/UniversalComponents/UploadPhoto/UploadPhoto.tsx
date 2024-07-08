import React, { ChangeEvent, FC, useRef, useState } from 'react';
import styles from "@/Styles/Universal/uploadPhoto.module.scss";
import Cropper from "react-cropper";
import 'cropperjs/dist/cropper.css';
import Modal from 'react-modal';

interface UploadPhotoProps {
  photos: string[];
  onPhotoAdd: (photo: string) => void;
  onPhotoClick: (photo: string) => void;
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
}

const UploadPhoto: FC<UploadPhotoProps> = ({
                                             photos,
                                             onPhotoAdd,
                                             onPhotoClick,
                                             isModalOpen,
                                             onModalOpen,
                                             onModalClose
                                           }) => {
  const cropperRef = useRef<HTMLImageElement & { cropper: Cropper }>(null);
  const [cropData, setCropData] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
          onModalOpen();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    setCropData(cropper?.getCroppedCanvas().toDataURL() || '');
  };

  const handleSavePhoto = () => {
    if (cropData) {
      onPhotoAdd(cropData);
      setImage('');
      setCropData('');
      onModalClose();
    }
  };

  const handleCancel = () => {
    setImage('');
    setCropData('');
    onModalClose();
  };

  return (
      <>
        <div className={styles.photo_upload}>
          {photos.map((photo, index) => (
              <div key={index} className={styles['photo-slot']} onClick={() => onPhotoClick(photo)}>
                <img src={photo} alt={`Фото ${index + 1}`} />
              </div>
          ))}
          {photos.length < 3 && (
              new Array(3 - photos.length).fill(null).map((_, index) => (
                  <div key={index + photos.length} className={styles['photo-slot']}>
                    <label htmlFor={`photo-upload-input-${index + photos.length}`} className={styles['photo-upload-label']}>
                      <span>+</span>
                    </label>
                    <input
                        id={`photo-upload-input-${index + photos.length}`}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                    />
                  </div>
              ))
          )}
        </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onModalClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
          {image && (
              <div className={styles['crop-container']}>
                <Cropper
                    src={image}
                    style={{ height: 400, width: '100%', backgroundColor: 'black' }}
                    initialAspectRatio={1}
                    aspectRatio={1}
                    guides={false}
                    cropBoxResizable={false}
                    cropBoxMovable={true}
                    viewMode={1}
                    dragMode="move"
                    scalable={true}
                    crop={handleCrop}
                    ref={cropperRef}
                />
                <div className={styles['button-group']}>
                  <button onClick={handleSavePhoto}>Сохранить фото</button>
                  <button onClick={handleCancel}>Отменить</button>
                </div>
              </div>
          )}
        </Modal>
      </>
  );
};

export default UploadPhoto;
