"use client";

import React, {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import { useEffect } from 'react';
import styles from "@/Styles/Layout/Layout.module.scss";
import ActionButtons from "@/components/Dating/ActionButtons/ActionButtons";

const icons = [
  { name: "поиск", icon: "/layout/PassiveIcons/dating.svg", activeIcon: "/layout/ActiveIcons/dating.svg", route: "/dating" },
  { name: "чат", icon: "/layout/PassiveIcons/favorites.svg", activeIcon: "/layout/ActiveIcons/favorites.svg", route: "/favorite" },
  { name: "профиль", icon: "/layout/PassiveIcons/profile.svg", activeIcon: "/layout/ActiveIcons/profile.svg", route: "/profile" },
  { name: "комната", icon: "/layout/PassiveIcons/room.svg", activeIcon: "/layout/ActiveIcons/room.svg", route: "#" },
  { name: "настройки", icon: "/layout/PassiveIcons/settings.svg", activeIcon: "/layout/ActiveIcons/settings.svg", route: "/settings" }
];

const Layout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const currentStep = localStorage.getItem('currentStep');
    if (currentStep) {
      router.push(`/auth/step_${currentStep}`);
      console.log(`Redirecting to step ${currentStep}`);
    }
  }, [router]);

  const handleNavigation = (route: string) => {
    if (route === "#") {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      router.push(route);
    }
  };

  const authRoutes = ["/auth/step_1", "/auth/step_2", "/auth/step_3", "/"];

  if (authRoutes.includes(pathname)) {
    return null;
  }

  return (
      <div className={pathname === "/dating" ? styles.contentDating : styles.container}>
        <footer className={styles.footer}>
          <ul className={styles.footerIconList}>
            {icons.map((item, index) => (
                <li
                    key={index}
                    className={styles.footerIconItem}
                    onClick={() => handleNavigation(item.route)}
                >
                  <img
                      src={(pathname === item.route ||
                          (item.route === "/dating" && pathname === "/dating/filter") ||
                          (item.route === "/profile" && pathname === "/profile/settings")) ? item.activeIcon : item.icon}
                      alt={item.name}
                  />
                </li>
            ))}
          </ul>
        </footer>
        {showNotification && (
            <div className={styles.notification}>
              <p>Скоро</p>
            </div>
        )}
        {pathname === "/dating" && (
            <>
              <ActionButtons/>
              <div className={styles.gradient}></div>
            </>
        )}
      </div>
  );
};

export default Layout;