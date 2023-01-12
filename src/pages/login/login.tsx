import React, { useState, useEffect, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Input,
  ShowIcon,
  HideIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from "../../services/actions/auth/login";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory<{ from: {pathname : string} }>();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const loading = useAppSelector((store) => store.auth.login_loading);
  const error = useAppSelector((store) => store.auth.login_error);
  const success = useAppSelector((store) => store.auth.login_success);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (!success) return;
    console.log("login was successful");
    if (history.location?.state?.from)
      history.push(history.location.state.from.pathname);
    else history.push("/");
  }, [success]);

  const logIn = (e : FormEvent) => {
    e.preventDefault();
    console.log("loggin in");
    dispatch(login(email, password));
  };
  const passwordIcon = passwordVisible ? (
    <ShowIcon type="primary" />
  ) : (
    <HideIcon type="primary" />
  );
  return (
    <div className={styles.centered}>
      <h1 className={`text text_type_main-medium ${styles.centeredText}`}>
        Вход
      </h1>
      <form onSubmit={logIn}> 
      <Input
        type={"text"}
        placeholder={"E-mail"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={"email"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="m-6 "
      />
      <Input
        type={passwordVisible ? "text" : "password"}
        placeholder={"Пароль"}
        onChange={(e) => setPassword(e.target.value)}
        icon={passwordVisible ? "ShowIcon" : "HideIcon"}
        value={password}
        name={"password"}
        error={false}
        onIconClick={togglePasswordVisibility}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="m-6"
        cellSpacing={24}
      />
      {error && (
        <p className={`text text_type_main-default ${styles.centeredText} m-4`}>
          Ошибка авторизации
        </p>
      )}
      <div className={`${styles.centeredElement} mb-20`}>
        <Button
          type="primary"
          size="medium"
          htmlType="submit" value="Submit"
        >
          Войти
          <ClipLoader
            loading={loading}
            size={"1.5em"}
            color={"white"}
            aria-label="Loading Spinner"
          />
        </Button>
      </div>
      </form>
      <p className={`text text_type_main-default ${styles.centeredText} m-4`}>
        Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p className={`text text_type_main-default ${styles.centeredText} m-4`}>
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </div>
  );
};
