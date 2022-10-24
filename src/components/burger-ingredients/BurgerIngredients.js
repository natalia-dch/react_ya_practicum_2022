import React from "react";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types.js";
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_CURRENT_INGREDIENT } from "../../services/actions/ingredients";

function BurgerIngredients() {
  const ingredients = useSelector(state => state.ingredients.items);
  const dispatch = useDispatch();
  const showIngredientInfo = (id) => {
    const item = ingredients.find((i) => i._id === id);
    if (!item) return;
    dispatch({ type: CHANGE_CURRENT_INGREDIENT, ingredientData: item });
  };
  
  const [current, setCurrent] = React.useState("bun");
  const buns = ingredients.filter((el) => el.type === "bun");
  const sauces = ingredients.filter((el) => el.type === "sauce");
  const mains = ingredients.filter((el) => el.type === "main");

  return (
    <>
      {" "}
      <p
        className={
          `text text_type_main-medium ml-2 mr-2 mt-10 mb-5 ` + styles.subheader
        }
      >
        {" "}
        Соберите бургер{" "}
      </p>
      <div className={`mb-10 ` + styles.tabs}>
        <a href="#buns">
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauces">
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#mains">
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={styles.container}>
        <p
          id="buns"
          className={"text text_type_main-medium " + styles.subtitle}
        >
          Булки
        </p>
        <div className={styles.ingContainer}>
          {buns.map((el, ind) => (
            <Ingredient
              name={el.name}
              image={el.image}
              onClick={() => {
                showIngredientInfo(el._id);
              }}
              price={el.price}
              id={el._id}
              key={el._id}
            />
          ))}
        </div>
        <p
          id="sauces"
          className={"text text_type_main-medium " + styles.subtitle}
        >
          Соусы
        </p>
        <div className={styles.ingContainer}>
          {sauces.map((el, ind) => (
            <Ingredient
              name={el.name}
              image={el.image}
              onClick={() => {
                showIngredientInfo(el._id);
              }}
              price={el.price}
              id={el._id}
              key={el._id}
            />
          ))}
        </div>
        <p
          id="mains"
          className={"text text_type_main-medium " + styles.subtitle}
        >
          Начинки
        </p>
        <div className={styles.ingContainer}>
          {mains.map((el, ind) => (
            <Ingredient
              name={el.name}
              image={el.image}
              onClick={() => {
                showIngredientInfo(el._id);
              }}
              price={el.price}
              id={el._id}
              key={el._id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function Ingredient({ name, image, price, id, onClick }) {
  const inConstructor = useSelector(state => state.constructorIngredients.find(i=>i._id === id))
  const qty = inConstructor ? inConstructor.qty : 0;
  return (
    <div className={styles.ingredient} onClick={onClick}>
      {qty > 0 && <Counter count={qty} size="default" />}
      <img src={image} className={styles.pic} alt={name} />
      <p className={"text text_type_digits-default"}>
        {price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={"text text_type_main-default"}>{name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
