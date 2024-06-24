import React, {FC} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from "@/Styles/Profile/profile.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "@/Store/store";
import Image from "next/image";

const CarouselElement: FC = () => {
  const profile = useSelector((state: RootState) => state.profile);

  return (
      <div>
        {profile.photos.length > 0 ? (
            <Carousel showThumbs={false} showArrows={false} showStatus={false}>
              {profile.photos.map((photo, index) => (
                  <div key={index} className={styles['carousel-slide']}>
                    <img src={photo} alt={`Photo ${index + 1}`} />
                    <div className={styles['image-gradient']} />
                  </div>
              ))}
            </Carousel>
        ) : (
              <Image src='src/Icons/default_avatar.png' alt="Placeholder" width={600} height={600}/>

        )}
      </div>
  );
};


export default CarouselElement;