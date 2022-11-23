import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Input,
  ShowIcon,
  HideIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { logout } from "../../services/actions/auth/logout";
import { changeUserInfo, getUserInfo } from "../../services/actions/userInfo";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { deleteCookie } from "../../utils/cookies";

export const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout_loading = useSelector((store) => store.auth.logout_loading);
  const logout_error = useSelector((store) => store.auth.logout_error);
  const logout_success = useSelector((store) => store.auth.logout_success);

  useEffect(() => {
    if (!logout_success) return;
    console.log("logout was successful");
    deleteCookie("accessToken")
    deleteCookie("refreshToken");
    history.go(0)
    // history.push("/login");
    //go to login page
  }, [logout_success]);

  const onLogoutClick = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.centered}>
      <div>
        <h1 className="text text_type_main-medium m-3 mt-6">Профиль</h1>
        <h1 className="text text_type_main-medium text_color_inactive m-3">
          История заказов
        </h1>
        <h1
          className={`text text_type_main-medium text_color_inactive m-3 ${styles.clickableText}`}
          onClick={onLogoutClick}
        >
          Выход{" "}
          <ClipLoader
            loading={logout_loading}
            size={"1.5em"}
            color={"white"}
            aria-label="Loading Spinner"
          />
        </h1>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете <br />
          изменить свои персональные данные
        </p>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.userInfo.user_info_loading);
  const error = useSelector((store) => store.userInfo.user_info_error);
  const success = useSelector((store) => store.userInfo.user_info_success);

  const edit_loading = useSelector(
    (store) => store.userInfo.change_user_info_loading
  );
  const edit_error = useSelector(
    (store) => store.userInfo.change_user_info_error
  );
  const edit_success = useSelector(
    (store) => store.userInfo.change_user_info_success
  );

  const emailFromAPI = useSelector((store) => store.userInfo.email);
  const nameFromAPI = useSelector((store) => store.userInfo.name);
  const tokenSuccess = useSelector((store) => store.auth.refresh_token_success);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [wasEdited, setWasEdited] = React.useState(false);

  useEffect(() => {
    if (!tokenSuccess) return;
    console.log("got a new token!");
    dispatch(getUserInfo());
  }, [tokenSuccess]);

  useEffect(() => {
    setWasEdited(false);
  }, [edit_success]);

  useEffect(() => {
    if (emailFromAPI === "") return;
    setEmail(emailFromAPI);
  }, [emailFromAPI]);

  useEffect(() => {
    if (nameFromAPI === "") return;
    setName(nameFromAPI);
  }, [nameFromAPI]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const save = (e) => {
    e.preventDefault();
    dispatch(changeUserInfo(name, email, password));
  };

  const onResetClick = () => {
    setName(nameFromAPI);
    setEmail(emailFromAPI);
    setPassword("");
  };

  return (
    <div className="ml-15">
      <form onSubmit={save}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => {
          setName(e.target.value);
          setWasEdited(true);
        }}
        icon={"EditIcon"}
        disabled={!success}
        value={name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="m-6"
      />
      <Input
        type={"text"}
        placeholder={"Логин"}
        onChange={(e) => {
          setEmail(e.target.value);
          setWasEdited(true);
        }}
        icon={"EditIcon"}
        disabled={!success}
        value={email}
        name={"email"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="m-6"
      />
      <Input
        type={"text"}
        placeholder={"Пароль"}
        onChange={(e) => {
          setPassword(e.target.value);
          setWasEdited(true);
        }}
        icon={"EditIcon"}
        value={password}
        name={"password"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="m-6"
      />
      {wasEdited && (
        <div className={styles.buttonsContainer}>
          <p
            onClick={onResetClick}
            className={`text text_type_main-default pt-4 ${styles.clickableText}`}
          >
            Отмена
          </p>
          <Button
            type="primary"
            size="medium"
            htmlType="submit" value="Submit"
            extraClass={`mr-6 ml-6`}
          >
            Сохранить
            <ClipLoader
              loading={edit_loading}
              size={"1.5em"}
              color={"white"}
              aria-label="Loading Spinner"
            />
          </Button>
        </div>
      )}
      </form>
    </div>
  );
};
