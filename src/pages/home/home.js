import React, { useState } from 'react';
// import {data} from '../../utils/data.js'
import styles from "./styles.module.css";
import AppHeader from "../../components/app-header/AppHeader";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import OrderDetails from "../../components/order-details/OrderDetails";
import IngredientsDetails from "../../components/ingredient-details/IngredientDetails";
import Modal from "../../components/modal/Modal";
import { getIngredients } from "../../services/actions/ingredientsAPI";
import { CHANGE_CURRENT_INGREDIENT } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ClipLoader from "react-spinners/ClipLoader";


export const HomePage = () => {
  const currentIngredient = useSelector((state) => state.currentIngredient);
  const orderSucceeded = useSelector((state) => state.order.orderSucceeded);
  const ingredients = useSelector((state) => state.ingredients);
  const [modalOpened, setModalOpened] = React.useState(false);
  const orderLoading = useSelector((state) => state.order.orderRequest);
  const dispatch = useDispatch();
  const closeModal = () => setModalOpened(false);
  const openModal = ()  => setModalOpened(true);
  const closeIngredientModal = () => {
    dispatch({ type: CHANGE_CURRENT_INGREDIENT, ingredientData: null });
  }

  const orderModal = (
    <Modal close={closeModal}>
      <OrderDetails />
    </Modal>
  );
  const ingredientModal = <Modal close={closeIngredientModal} title={"Детали ингредиента"}><IngredientsDetails /></Modal>;

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  // const showOrderInfo = () => {
  //   setModalOpened(true);
  // };

  return (
    <div className={styles.app}>
      {currentIngredient && ingredientModal}
      {modalOpened && orderSucceeded && orderModal}
      <AppHeader />
      {ingredients.loading && (
        <p className={"text text_type_digits-default"}>loading...</p>
      )}
      {ingredients.error && (
        <p className={"text text_type_digits-default"}>server error</p>
      )}
      {!ingredients.loading && !ingredients.error && (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
          <section className={styles.section}>
            <BurgerIngredients />
          </section>
          <section className={styles.section}>
            <BurgerConstructor showModal={openModal} />
          </section>
          </DndProvider>
        </main>
      )}
    </div>
  );
}
