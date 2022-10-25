import React from "react";
import styles from "./burger-constructor.module.css";
import {
  Tab,
  CurrencyIcon,
  LockIcon,
  DeleteIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types.js";
import { useSelector, useDispatch } from 'react-redux';
import { order } from '../../services/actions/order';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../services/actions/ingredients';
import { useDrop } from "react-dnd";

function BurgerConstructor({ showModal }) {
  const ingredients = useSelector(store => store.ingredients.items);
  const constructorIngredients = useSelector(state => state.constructorIngredients); 
  const dispatch = useDispatch();
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
        onDropHandler(itemId);
    },
    collect: monitor => ({
        isHover: monitor.isOver(),
    })
});

  
  const removeIngredient = (itemId) => {
    const item = ingredients.filter(element => element._id === itemId.id)
     dispatch({type:REMOVE_INGREDIENT,id:itemId})}
  
  const onDropHandler = (itemId) => {
    const draggedItem = ingredients.filter(element => element._id === itemId.id)[0];
    const itemToStore = {...draggedItem,listId:Date.now().toString()};
    console.log(draggedItem);
     dispatch({type:ADD_INGREDIENT,item:itemToStore});
  }


  const makeOrder = () => {
    showModal();
    dispatch(order(ingredients.map(i=>i._id)));
  }

  return (
    <div className={"mt-10 " + styles.mainContainer} ref={dropTarget}>
      <div className={"ml-6 "}>
      {constructorIngredients.bread && <ConstructorElement
        type="top"
        isLocked={true}
        text={constructorIngredients.bread.name + "\n(верх)"}
        price={constructorIngredients.bread.price}
        thumbnail={constructorIngredients.bread.image}
      />}
      </div>
      <div className={styles.ingContainer}>
        {constructorIngredients.ingredients.map((el, ind) => (
          <div key={el.listId}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={el.name}
            price={el.price}
            thumbnail={el.image}
            handleClose={()=>removeIngredient(el.listId)}
          />
          </div>
        ))}
      </div>
      <div className={"ml-6 "}>
      {constructorIngredients.bread && <ConstructorElement
        type="bottom"
        isLocked={true}
        text={constructorIngredients.bread.name + "\n(низ)"}
        price={constructorIngredients.bread.price}
        thumbnail={constructorIngredients.bread.image}
      />}
      </div>
      <div className={"mt-10 mr-4 " + styles.totalContainer}>
        <p className={"text text_type_digits-default pl-10 pr-10"}>
          {constructorIngredients.ingredients.reduce((sum,el)=>sum + el.price,0)+2* (constructorIngredients.bread ? constructorIngredients.bread.price : 0)}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="medium"
          onClick={makeOrder}
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
