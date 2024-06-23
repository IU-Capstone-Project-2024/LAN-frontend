import React, {FC} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from "@/Styles/Profile/profile.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "@/Store/store";


const CarouselElement: FC = () => {
  const profile = useSelector((state: RootState) => state.profile);

  return (
      <div>
        <Carousel showThumbs={false} showArrows={false} showStatus={false}>
          {profile.photos.map((photo, index) => (
              <div key={index}>
                <img src={photo} alt={`Photo ${index + 1}`} className={styles["img"]}/>
                <div className={styles['image-gradient']}/>
              </div>
          ))}
        </Carousel>
      </div>
  );
};


export default CarouselElement;