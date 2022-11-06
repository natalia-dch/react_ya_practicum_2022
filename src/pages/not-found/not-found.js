import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';


export const NotFound404Page = () => {
  return (
    <div className={styles.centered}>
          <h1 className="text text_type_main-medium">Упс! Ошибка 404</h1>
          <p className="text text_type_main-default">Такая страница не существует</p>
          <p className="text text_type_main-default">Проверьте адресную строку или вернитесь на <Link to='/'>главную страницу</Link></p>
    </div>
  );
}