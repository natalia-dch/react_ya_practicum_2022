import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import {
    Input,
    ShowIcon,
    HideIcon,
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfilePage = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    return(
    <div   className={styles.centered}>
    <div>
    <h1 className="text text_type_main-medium m-3 mt-6">Профиль</h1>
    <h1 className="text text_type_main-medium text_color_inactive m-3">История заказов</h1>
    <h1 className="text text_type_main-medium text_color_inactive m-3">Выход</h1>
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