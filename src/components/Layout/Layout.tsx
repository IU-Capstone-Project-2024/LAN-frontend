"use client";
import React from "react";
import styles from "@/Styles/Layout.module.scss";

const icons = [
  { name: "поиск", icon: "/layout_first/поиск.svg" },
  { name: "чат", icon: "/layout_first/чат.svg" },
  { name: "профиль", icon: "/layout_first/профиль.svg" },
  { name: "комната", icon: "/layout_first/комната.svg" },
  { name: "настройки", icon: "/layout_first/настройки.svg" }
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>
        <ul className={styles.footerIconList}>
          {icons.map((item, index) => (
            <li key={index} className={styles.footerIconItem}>
              <img src={item.icon} alt={item.name} />
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
};

export default Layout;
