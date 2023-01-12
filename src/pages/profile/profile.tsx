import React, { useState, useEffect, FormEvent } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
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
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { OrderHistoryPage } from "../order-history/order-history";

export const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const logout_loading = useAppSelector((store) => store.auth.logout_loading);
  const logout_error = useAppSelector((store) => store.auth.logout_error);
  const logout_success = useAppSelector((store) => store.auth.logout_success);

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

  const onProfileClick = () => {
    history.replace("/profile");
  };

  const onOrderHistoryClick = () => {
    history.replace("/profile/orders");
  };

  return (
    <div className={styles.centered}>
      <div>
      <h1 className={`text text_type_main-medium ${history.location.pathname !== "/profile" &&"text_color_inactive"} m-3 ${styles.clickableText}`}
      onClick={onProfileClick}
      >Профиль</h1>
      <h1 className={`text text_type_main-medium ${history.location.pathname === "/profile" &&"text_color_inactive"} m-3 ${styles.clickableText}`}
      onClick={onOrderHistoryClick}
      >
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
        {history.location.pathname == "/profile"? <Profile /> : <OrderHistoryPage/>}
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((store) => store.userInfo.user_info_loading);
  const error = useAppSelector((store) => store.userInfo.user_info_error);
  const success = useAppSelector((store) => store.userInfo.user_info_success);

  const edit_loading = useAppSelector(
    (store) => store.userInfo.change_user_info_loading
  );
  const edit_error = useAppSelector(
    (store) => store.userInfo.change_user_info_error
  );
  const edit_success = useAppSelector(
    (store) => store.userInfo.change_user_info_success
  );

  const emailFromAPI = useAppSelector((store) => store.userInfo.email);
  const nameFromAPI = useAppSelector((store) => store.userInfo.name);
  const tokenSuccess = useAppSelector((store) => store.auth.refresh_token_success);

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [wasEdited, setWasEdited] = React.useState<boolean>(false);

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

  const save = (e : FormEvent) => {
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
