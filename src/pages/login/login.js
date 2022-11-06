import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import {
    Input,
    ShowIcon,
    HideIcon,
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";

export const LoginPage = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    const login = () => {
        console.log("loggin in"); //TODO
    }
    const passwordIcon = passwordVisible ?   <ShowIcon type="primary" /> :
    <HideIcon type="primary" />;
    return(
    <><h1 className="text text_type_main-medium">Вход</h1>
        <Input
    type={'text'}
    placeholder={'E-mail'}
    onChange={e => setEmail(e.target.value)}
    value={email}
    name={'email'}
    error={false}
    errorText={'Ошибка'}
    size={'default'}
    extraClass="ml-1"
  />
    <Input
    type={'text'}
    placeholder={'Пароль'}
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
  <Button type="primary" size="medium" htmlType="button" onClick={login}>
  Войти
 </Button>
 <p className="text text_type_main-default">Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
 <p className="text text_type_main-default">Забыли пароль? <Link to="/reset-password">Восстановить пароль</Link></p>
  </>
      
    )
}