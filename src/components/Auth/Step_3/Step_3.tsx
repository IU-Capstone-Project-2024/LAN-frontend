"use client"

import React, {FC} from 'react';
import {useRouter} from "next/navigation";
import styles from "@/Styles/Auth/Step3.module.scss";
import Interests from "@/components/Profile/ProfileSettings/Interests/Interests";
import CoLifeSettings from "@/components/Profile/ProfileSettings/CoLife/CoLife";

const Step3: FC = () => {
  const router = useRouter();

  const nextStep = () => {
    router.push('/profile');
  };

  const prevStep = () => {
    router.push('/auth/step_2');
  }


  return (
      <div className={styles.container}>
        <h1>Создание профиля (3/3)</h1>
        <Interests/>
        <div className={styles["co-life"]}>
          <CoLifeSettings title="Заполните опрос:"/>
        </div>
        <div className={styles.buttons}>
          <button className={styles["button"]} onClick={prevStep}>Назад</button>
          <button className={styles["button"]} onClick={nextStep}>Завершить</button>
        </div>
      </div>
  );
};

export default Step3;