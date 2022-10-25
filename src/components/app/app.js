import React, { useState } from 'react';
import logo from "./logo.svg";
// import {data} from '../../utils/data.js'
import styles from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import OrderDetails from "../order-details/OrderDetails";
import IngredientsDetails from "../ingredient-details/IngredientDetails";
import Modal from "../modal/Modal";
import { getIngredients } from "../../services/actions/ingredientsAPI";
import { CHANGE_CURRENT_INGREDIENT } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  const currentIngredient = useSelector((state) => state.currentIngredient);
  const orderSucceeded = useSelector((state) => state.order.orderSucceeded);
  const ingredients = useSelector((state) => state.ingredients);
  const [modalOpened, setModalOpened] = React.useState(false);
  const dispatch = useDispatch();
  const closeModal = () => setModalOpened(false);
  const openModal = ()  => setModalOpened(true);
  const closeIngredientModal = () => {
    dispatch({ type: CHANGE_CURRENT_INGREDIENT, ingredientData: null });
  }

  const orderModal = (
    <Modal title={"Детали ингредиента"} close={closeModal}>
      <OrderDetails />
    </Modal>
  );
  const ingredientModal = <Modal close={closeIngredientModal}><IngredientsDetails /></Modal>;

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

export default App;
