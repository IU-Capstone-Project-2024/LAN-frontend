"use client"

import React, {FC} from 'react';
import {useRouter} from "next/navigation";
import styles from "@/Styles/Auth/Step2.module.scss";
import About from "@/components/Profile/ProfileSettings/About/About";
import SocialLinks from "@/components/Profile/ProfileSettings/SocialLinks/SocialLinks";

const Step2: FC = () => {
  const router = useRouter();

  const nextStep = () => {
    router.push('/auth/step_3');
  };

  const prevStep = () => {
    router.push('/auth/step_1');
  }


  return (
      <div className={styles.container}>
        <h1>Создание профиля (2/3)</h1>
        <div>
          <h2>Расскажите о себе</h2>
          <About/>
        </div>

        <SocialLinks/>

        <div>
          <button className={styles["button"]} onClick={prevStep}>Назад</button>
          <button className={styles["button"]} onClick={nextStep}>Далее</button>
        </div>
      </div>
  );
};

export default Step2;