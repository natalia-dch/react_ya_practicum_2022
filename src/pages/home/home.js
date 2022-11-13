import React, { useState } from "react";
// import {data} from '../../utils/data.js'
import styles from "./styles.module.css";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const HomePage = () => {
  const currentIngredient = useSelector((state) => state.currentIngredient);
  const ingredients = useSelector((state) => state.ingredients);

  return (
    <div className={styles.app}>
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
              <BurgerConstructor />
            </section>
          </DndProvider>
        </main>
      )}
    </div>
  );
};
