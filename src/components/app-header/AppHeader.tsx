import React, { FC, ReactNode } from "react";
import styles from "./app-header.module.css";
import { Link, NavLink, useRouteMatch } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.container}>
      <div className={styles.leftContainer}>
        <MenuItem
          path="/"
          logo={<BurgerIcon type="secondary" />}
          text="Конструктор"
        />
        <MenuItem
          path="/orders"
          logo={<ListIcon type="secondary" />}
          text="Лента заказов"
        />
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <MenuItem
        path="/profile"
        logo={<ProfileIcon type="secondary" />}
        text="Личный кабинет"
      />
    </header>
  );
}
type THeaderProps = {
  logo: ReactNode,
  text: string,
  path: string
}

const MenuItem : FC<THeaderProps> = ({ logo, text, path }) => {
  const isActive = useRouteMatch(path);
  return (
    <NavLink to={path}>
      <div
        className={"mt-4 mb-4 lm-2 mr-2 pt-5 pb-5 pl-5 pr-5 " + styles.menuItem}
      >
        {logo}
        <p
          className={`text text_type_main-default ml-2 mr-2 ${
            isActive?.isExact ? "" : "text_color_inactive"
          }`}
        >
          {text}
        </p>
      </div>
    </NavLink>
  );
}

export default AppHeader;
