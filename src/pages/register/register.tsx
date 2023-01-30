import React, { FormEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Input,
  ShowIcon,
  HideIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from "../../services/actions/auth/register";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

export const RegisterPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const loading = useAppSelector((store) => store.auth.register_loading);
  const error = useAppSelector((store) => store.auth.register_error);
  const success = useAppSelector((store) => store.auth.register_success);

  useEffect(() => {
    if (!success) return;
    console.log("registration was successful");
    //go to home page
    history.push("/");
  }, [success]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const registerUser = (e : FormEvent) => {
    console.log("registering")
    e.preventDefault();
    dispatch(register(email, password, name));
  };
  const passwordIcon = passwordVisible ? (
    <ShowIcon type="primary" />
  ) : (
    <HideIcon type="primary" />
  );
  return (
    <div className={styles.centered}>
      <h1 className={`text text_type_main-medium ${styles.centeredText}`}>
        Регистрация
      </h1>
      <form onSubmit={registerUser}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setName(e.target.value)}
        value={name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="m-6"
      />
      <Input
        type={"text"}
        placeholder={"E-mail"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={"email"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="m-6"
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
      />
      {error && (
        <p className={`text text_type_main-default ${styles.centeredText} m-4`}>
          Ошибка регистрации
        </p>
      )}
      <div className={`${styles.centeredElement} mb-20`}>
        <Button
          type="primary"
          size="medium"
          htmlType="submit" value="Submit"
        >
          Зарегистрироваться
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
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};
