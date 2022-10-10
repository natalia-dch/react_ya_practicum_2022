import React from 'react';
import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function AppHeader(props) {
  return (<div className={styles.container}>
    <div className={styles.leftContainer}>
      <MenuItem logo={<BurgerIcon type = "primary" />} text="Конструктор" active/>
      <MenuItem logo={<ListIcon type = "secondary" />} text="Лента заказов"/>
    </div>
    <div className={styles.logo}>
      <Logo/>
    </div>
    <MenuItem logo={<ProfileIcon type = "secondary" />} text="Личный кабинет"/>
  </div>)
}

function MenuItem({logo, text, active}) {
  return (<div className={"mt-4 mb-4 lm-2 mr-2 pt-5 pb-5 pl-5 pr-5 " + styles.menuItem}>
    {logo}
    <p className={`text text_type_main-default ml-2 mr-2 ${ !active
        ? "text_color_inactive"
        : null}`}>
      {text}
    </p>
  </div>)
}

MenuItem.propTypes = {
  logo: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool
}

export default AppHeader;
