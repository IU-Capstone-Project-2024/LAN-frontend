import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import styles from "@/Styles/ProfileSettings/profileSettings.module.scss";
import Cropper from "react-cropper";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/Store/store";
import {setPhotos, setModalPhoto, setShowModal} from "@/Store/slices/profileSlice";
import 'cropperjs/dist/cropper.css';



const UploadPhoto: FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const cropperRef = useRef<HTMLImageElement & { cropper: Cropper }>(null);
  const dispatch = useDispatch();

  const [cropData, setCropData] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [profileState, setProfileState] = useState({
    photos: profile.photos,
  });

  useEffect(() => {
    setProfileState(profile);
  }, [profile]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    setCropData(cropper?.getCroppedCanvas().toDataURL() || '');
  };

  const handlePhotoClick = (photo: string) => {
    dispatch(setModalPhoto(photo));
    dispatch(setShowModal(true));
  };

  const handleSavePhoto = () => {
    if (cropData) {
      dispatch(setPhotos([...profileState.photos, cropData]));
      setImage('');
      setCropData('');
    }
  };

  return (
      <>
        <div className={styles['photo-upload']}>
          {profileState.photos.map((photo, index) => (
              <div key={index} className={styles['photo-slot']} onClick={() => handlePhotoClick(photo)}>
                <img src={photo} alt={`Фото ${index + 1}`} />
              </div>
          ))}
          {profileState.photos.length < 3 && (
              new Array(3 - profile.photos.length).fill(null).map((_, index) => (
                      <div key={index + profile.photos.length} className={styles['photo-slot']}>
                        <label htmlFor="photo-upload-input" className={styles['photo-upload-label']}>
                          <span>+</span>
                        </label>
                        <input
                            id="photo-upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{display: 'none'}}
                        />
                      </div>
              ))
          )}
        </div>
        {image && (
            <div className={styles['crop-container']}>
              <Cropper
                  src={image}
                  style={{height: 400, width: '100%', backgroundColor: 'black'}}
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
              <button onClick={handleSavePhoto}>Сохранить фото</button>
            </div>
        )}
      </>
  );
};

export default UploadPhoto;