import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from "./styles.module.css";
import {
    Input,
    ShowIcon,
    HideIcon,
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { resetPassword } from "../../services/actions/auth/resetPassword";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";

export const ForgotPasswordPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const loading = useSelector((store) => store.resetPassword.reset_password_loading);
    const error = useSelector((store) => store.resetPassword.reset_password_error);
    const success = useSelector((store) => store.resetPassword.reset_password_success);
    const reset = () => {
        console.log("reseting"); //TODO
        dispatch(resetPassword(email));

    };

    useEffect(()=>{
      if(!success) return;
      console.log("reseting was successful");
      //go to changing password page
      history.push("/reset-password");
      },[success])

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
     {error && <p className={`text text_type_main-default ${styles.centeredText} m-4`}>Ошибка</p>}
    <div  className={`${styles.centeredElement} mb-20`}>
  <Button type="primary" size="medium" htmlType="button" onClick={reset}>
  Восстановить
  <ClipLoader
        loading={loading}
        size={"1.5em"}
        color={"white"}
        aria-label="Loading Spinner"
      />
 </Button>
 </div>
 <p className={`text text_type_main-default ${styles.centeredText}`}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
  </div>
      
    )
}