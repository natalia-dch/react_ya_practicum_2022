import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from "./styles.module.css";
import {
    Input,
    ShowIcon,
    HideIcon,
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { logout } from "../../services/actions/auth/logout";
  import { getUserInfo } from "../../services/actions/userInfo";
  import ClipLoader from "react-spinners/ClipLoader";
  import { useSelector, useDispatch } from "react-redux";

export const ProfilePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logout_loading = useSelector((store) => store.auth.logout_loading);
    const logout_error = useSelector((store) => store.auth.logout_error);
    const logout_success = useSelector((store) => store.auth.logout_success);



    useEffect(()=>{
      if(!logout_success) return;
      console.log("logout was successful");
      history.push("/login")
      //go to login page
      
      },[logout_success])

    const onLogoutClick = () => {
        console.log("logging out"); 
        dispatch(logout());
        
    }
    return(
    <div   className={styles.centered}>
    <div>
    <h1 className="text text_type_main-medium m-3 mt-6">Профиль</h1>
    <h1 className="text text_type_main-medium text_color_inactive m-3">История заказов</h1>
    <h1 className={`text text_type_main-medium text_color_inactive m-3 ${styles.menuText}`} onClick={onLogoutClick}>Выход  <ClipLoader
        loading={logout_loading}
        size={"1.5em"}
        color={"white"}
        aria-label="Loading Spinner"
      /></h1>
    <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете <br/>
изменить свои персональные данные</p>
   </div>
   <div>
   <Profile/>
   </div>
  </div>
      
    )
}

const Profile = () => {
   const dispatch = useDispatch();
   const user_info_loading = useSelector((store) => store.userInfo.user_info_loading);

   useEffect(()=>{
    dispatch(getUserInfo())
  },[])
  const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    return(
    <div className="ml-15">
                <Input
    type={'text'}
    placeholder={'Имя'}
    onChange={e => setName(e.target.value)}
    icon={'EditIcon'}
    value={name}
    name={'name'}
    error={false}
    errorText={'Ошибка'}
    size={'default'}
    extraClass="m-6"
  />
        <Input
    type={'text'}
    placeholder={'Логин'}
    onChange={e => setEmail(e.target.value)}
    icon={'EditIcon'}
    value={email}
    name={'email'}
    error={false}
    errorText={'Ошибка'}
    size={'default'}
    extraClass="m-6"
  />
    <Input
    type={'text'}
    placeholder={'Пароль'}
    onChange={e => setPassword(e.target.value)}
    icon={'EditIcon'}
    value={password}
    name={'password'}
    error={false}
    errorText={'Ошибка'}
    size={'default'}
    extraClass="m-6"
  />
  </div>
      
    ) 
}