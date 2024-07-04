"use client";

import React from "react";
import {usePathname, useRouter} from "next/navigation";
import styles from "@/Styles/Layout.module.scss";

const icons = [
  { name: "поиск", icon: "/layout/PassiveIcons/dating.svg", activeIcon: "/layout/ActiveIcons/dating.svg", route: "/dating" },
  { name: "чат", icon: "/layout/PassiveIcons/favorites.svg", activeIcon: "/layout/ActiveIcons/favorites.svg", route: "/favorite" },
  { name: "профиль", icon: "/layout/PassiveIcons/profile.svg", activeIcon: "/layout/ActiveIcons/profile.svg", route: "/profile" },
  { name: "комната", icon: "/layout/PassiveIcons/room.svg", activeIcon: "/layout/ActiveIcons/room.svg", route: "/room" },
  { name: "настройки", icon: "/layout/PassiveIcons/settings.svg", activeIcon: "/layout/ActiveIcons/settings.svg", route: "/settings" }
];

const Layout = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
      <div className={styles.container}>
        <footer className={styles.footer}>
          <ul className={styles["footerIconList"]}>
            {icons.map((item, index) => (
                <li
                    key={index}
                    className={styles["footerIconItem"]}
                    onClick={() => handleNavigation(item.route)}
                >
                  <img
                      src={pathname === item.route ? item.activeIcon : item.icon}
                      alt={item.name}
                  />
                </li>
            ))}
          </ul>
          <div className={styles['gradient']}></div>
        </footer>

      </div>
  );
};

export default Layout;