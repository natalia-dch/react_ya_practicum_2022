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
    <div>
    <div>
    <h1 className="text text_type_main-medium">Профиль</h1>
    <h1 className="text text_type_main-medium text_color_inactive">История заказов</h1>
    <h1 className="text text_type_main-medium text_color_inactive">Выход</h1>

    <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете <br/>
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
    <>
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
    extraClass="ml-1"
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
    extraClass="ml-1"
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
    extraClass="ml-1"
  />
  </>
      
    ) 
}