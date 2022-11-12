import React, { useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import { useDrag } from "react-dnd";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types.js";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_CURRENT_INGREDIENT } from "../../services/actions/ingredients";
import { useHistory, useLocation } from 'react-router-dom';

function BurgerIngredients() {
  const ingredients = useSelector((state) => state.ingredients.items);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const showIngredientInfo = (id) => {
    const item = ingredients.find((i) => i._id === id);
    if (!item) return;
    dispatch({ type: CHANGE_CURRENT_INGREDIENT, ingredientData: item });
    history.push(`/ingredient/${id}`,{ background: location })
  };

  const [current, setCurrent] = React.useState("bun");
  const buns = ingredients.filter((el) => el.type === "bun");
  const sauces = ingredients.filter((el) => el.type === "sauce");
  const mains = ingredients.filter((el) => el.type === "main");

  useEffect(() => {
    const options1 = {
      root: document.querySelector("#container"),
      rootMargin: "10px",
      threshold: 0.0,
    };
    const options2 = {
      root: document.querySelector("#container"),
      rootMargin: "0px",
      threshold: 0.0,
    };
    const targets = ["bun", "sauce", "main"];

    const changeSectionGoingUp = (entries, observer) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.boundingClientRect.top < entry.rootBounds.top
        )
          setCurrent(entry.target.id.slice(0, -9));
      });
    };
    const changeSectionGoingDown = (entries, observer) => {
      entries.forEach((entry) => {
        if (
          !entry.isIntersecting &&
          entry.boundingClientRect.top < entry.rootBounds.top
        ) {
          const index = targets.findIndex(
            (e) => e === entry.target.id.slice(0, -9)
          );
          const current = targets[(index + 1) % 3];
          setCurrent(current);
        }
      });
    };
    const observer1 = new IntersectionObserver(changeSectionGoingUp, options1);
    const observer2 = new IntersectionObserver(
      changeSectionGoingDown,
      options2
    );

    targets.forEach((target) => {
      const targetEl = document.querySelector("#" + target + "Container");
      observer1.observe(targetEl);
      observer2.observe(targetEl);
    });
  }, []);

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
        <a href="#bun">
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauce">
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#main">
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={styles.container} id="container">
        <div id="bunContainer">
          <p
            id="bun"
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
        </div>
        <div id="sauceContainer">
          {" "}
          <p
            id="sauce"
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
        </div>
        <div id="mainContainer">
          <p
            id="main"
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
      </div>
    </>
  );
}

function Ingredient({ name, image, price, id, onClick }) {
  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: {id},
    collect: monitor => ({
      isDrag: monitor.isDragging()
  })
});
  const qty = useSelector((state) =>
    state.constructorIngredients.ingredients.filter((i) => i._id === id).length 
    + (state.constructorIngredients.bread && state.constructorIngredients.bread._id === id ? 2 : 0)
  )
  return (
    // !isDrag && 
    <div className={styles.ingredient} onClick={onClick} ref={dragRef}>
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
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
