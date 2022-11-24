import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import {
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFound404Page,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "../../pages";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { CHANGE_CURRENT_INGREDIENT } from "../../services/actions/ingredients";
import AppHeader from "../app-header/AppHeader";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderDetails from "../order-details/OrderDetails";
import { getIngredients } from "../../services/actions/ingredientsAPI";
import Modal from "../modal/Modal";
import { useAppDispatch } from "../../utils/hooks";
// import { ProtectedRoute } from './components/protected-route';
// import { ProvideAuth } from './services/auth';

export default function App() {
  const location = useLocation<{ background: any }>();
  const history = useHistory();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const closeModal = () => {
    history.push("/");
  };

  const closeIngredientModal = () => {
    dispatch({ type: CHANGE_CURRENT_INGREDIENT, ingredientData: null });
    history.push("/");
  };

  return (
    <>
      <AppHeader />
      <Switch>
        <ProtectedRoute fromAuthorized path="/login" exact={true}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute fromAuthorized path="/register" exact={true}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute fromAuthorized path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute fromAuthorized path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute fromUnauthorized path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredient/:id" exact={true}>
          <IngredientPage>
            <IngredientDetails />
          </IngredientPage>
        </Route>
        <ProtectedRoute fromUnauthorized path="/order" exact={true}>
          <HomePage />
          <Modal close={closeModal}>
            <OrderDetails />
          </Modal>
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route>
          <NotFound404Page />
        </Route>
      </Switch>
      {(background || (new PerformanceNavigationTiming).type === "reload") && (
        <Switch>
          <Route path="/ingredient/:id" exact={true}>
            <HomePage />
            <Modal close={closeModal} title={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
          </Route>
        </Switch>
      )}
    </>
  );
}
