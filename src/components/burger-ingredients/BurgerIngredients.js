import React from "react";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types.js";

function BurgerIngredients({ ingredients, onItemClick }) {
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
                onItemClick(el._id);
              }}
              price={el.price}
              quantity={Math.floor(Math.random() * 5)}
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
                onItemClick(el._id);
              }}
              price={el.price}
              quantity={Math.floor(Math.random() * 5)}
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
                onItemClick(el._id);
              }}
              price={el.price}
              quantity={Math.floor(Math.random() * 5)}
              key={el._id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

function Ingredient({ name, image, price, quantity, onClick }) {
  return (
    <div className={styles.ingredient} onClick={onClick}>
      {quantity > 0 && <Counter count={quantity} size="default" />}
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
