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
  return (
    <>
      {" "}
      <p className={`text text_type_main-medium ml-2 mr-2 ` + styles.subheader}>
        {" "}
        Соберите бургер{" "}
      </p>
      <div className={styles.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>{" "}
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingContainer}>
        {ingredients.map((el, ind) =>
          el.type === current ? (
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
          ) : null
        )}{" "}
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
