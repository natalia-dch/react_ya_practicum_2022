import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import {
    Input,
    ShowIcon,
    HideIcon,
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = React.useState('')
    const reset = () => {
        console.log("reseting"); //TODO
    };
    return(
    <div className={styles.centered}><h1 className={`text text_type_main-medium ${styles.centeredText}`}>Восстановление пароля</h1>
        <Input
    type={'text'}
    placeholder={'Укажите e-mail'}
    onChange={e => setEmail(e.target.value)}
    value={email}
    name={'email'}
    error={false}
    errorText={'Ошибка'}
    size={'default'}
    extraClass="m-6"
  />
    <div  className={`${styles.centeredElement} mb-20`}>
  <Button type="primary" size="medium" htmlType="button" onClick={reset}>
  Восстановить
 </Button>
 </div>
 <p className={`text text_type_main-default ${styles.centeredText}`}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
  </div>
      
    )
}