import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import {
    Input,
    ShowIcon,
    HideIcon,
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPasswordPage = () => {
    const [password, setPassword] = React.useState('')
    const [code, setCode] = React.useState('')
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    const reset = () => {
        console.log("reseting"); //TODO
    };
    return(
    <><h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
    type={'text'}
    placeholder={'Введите новый пароль'}
    onChange={e => setPassword(e.target.value)}
    icon={passwordVisible ?   'ShowIcon' : 'HideIcon'}
    value={password}
    name={'password'}
    error={false}
    onIconClick={togglePasswordVisibility}
    errorText={'Ошибка'}
    size={'default'}
    extraClass="ml-1"
  />
        <Input
    type={'text'}
    placeholder={'Введите код из письма'}
    onChange={e => setCode(e.target.value)}
    value={code}
    name={'code'}
    error={false}
    errorText={'Ошибка'}
    size={'default'}
    extraClass="ml-1"
  />
  <Button type="primary" size="medium" htmlType="button" onClick={reset}>
  Сохранить
 </Button>
 <p className="text text_type_main-default">Вспомнили пароль? <Link to="/login">Войти</Link></p>
  </>
      
    )
}