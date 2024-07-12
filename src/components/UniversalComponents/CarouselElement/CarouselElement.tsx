import React, { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from "@/Styles/Universal/Carousel.module.scss";
import Image from "next/image";
import '@/Styles/Universal/castomCarousel/castomCarousel.css';

interface CarouselElementProps {
  photos: string[] | null;
}

const CarouselElement: FC<CarouselElementProps> = ({ photos }) => {
  return (
    <>
      {photos && Array.isArray(photos) && photos.length > 0 ? (
        <Carousel showThumbs={false} showArrows={false} showStatus={false}>
          {photos.map((photo, index) => (
            <div key={index} className={styles['carousel-slide']}>
              <img src={photo} alt={`Photo ${index + 1}`} />
              <div className={styles['image-gradient']} />
            </div>
          ))}
        </Carousel>
      ) : (
        <Image src='/default_avatar.png' alt="Placeholder" width={600} height={600} />
      )}
    </>
  );
};

export default CarouselElement;
