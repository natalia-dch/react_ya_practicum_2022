import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from "./styles.module.css";
import {
    Input,
    ShowIcon,
    HideIcon,
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from "../../services/actions/auth/login";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const loading = useSelector((store) => store.auth.login_loading);
    const error = useSelector((store) => store.auth.login_error);
    const success = useSelector((store) => store.auth.login_success);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    useEffect(()=>{
      if(!success) return;
      console.log("login was successful");
      history.push("/")
      //go to home page
      },[success])

    const onLoginClick = () => {
        console.log("loggin in"); 
        dispatch(login(email,password));
        
    }
    const passwordIcon = passwordVisible ?   <ShowIcon type="primary" /> :
    <HideIcon type="primary" />;
    return(
    <div className={styles.centered}><h1 className={`text text_type_main-medium ${styles.centeredText}`}>Вход</h1>
        <Input
    type={'text'}
    placeholder={'E-mail'}
    onChange={e => setEmail(e.target.value)}
    value={email}
    name={'email'}
    error={false}
    errorText={'Ошибка'}
    size={'default'}
    extraClass="m-6 "
  />
    <Input
    type={passwordVisible ? 'text':'password'}
    placeholder={'Пароль'}
    onChange={e => setPassword(e.target.value)}
    icon={passwordVisible ?   'ShowIcon' : 'HideIcon'}
    value={password}
    name={'password'}
    error={false}
    onIconClick={togglePasswordVisibility}
    errorText={'Ошибка'}
    size={'default'}
    extraClass="m-6"
    cellSpacing={24}
  />
   {error && <p className={`text text_type_main-default ${styles.centeredText} m-4`}>Ошибка авторизации</p>}
  <div className={`${styles.centeredElement} mb-20`}>
    <Button type="primary" size="medium" htmlType="button" onClick={onLoginClick}>
  Войти
  <ClipLoader
        loading={loading}
        size={"1.5em"}
        color={"white"}
        aria-label="Loading Spinner"
      />
 </Button>
 </div>
 <p className={`text text_type_main-default ${styles.centeredText} m-4`}>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
 <p className={`text text_type_main-default ${styles.centeredText} m-4`}>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
  </div>
      
    )
}