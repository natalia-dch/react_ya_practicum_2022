import React, { FC, ReactNode } from "react";
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
import { TIngredient } from "../../utils/types.js";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CHANGE_INGREDIENT_POSITION,
} from "../../services/actions/ingredients";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

function BurgerConstructor() {
  const location = useLocation();
  const history = useHistory();
  const ingredients = useAppSelector((store) => store.ingredients.items);
  const orderLoading = useAppSelector((state) => state.order.orderRequest);
  const constructorIngredients = useAppSelector(
    (state) => state.constructorIngredients
  );
  const dispatch = useAppDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId  : {id: string}) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const removeIngredient = (itemId : {id: string}) => {
    const item = ingredients.filter((element) => element._id === itemId.id);
    dispatch({ type: REMOVE_INGREDIENT, id: itemId });
  };

  const onDropHandler = (itemId : {id: string}) => {
    const draggedItem = ingredients.filter(
      (element) => element._id === itemId.id
    )[0];
    const itemToStore = { ...draggedItem, listId: Date.now().toString() };
    dispatch({ type: ADD_INGREDIENT, item: itemToStore });
  };

  const makeOrder = () => {
    history.push("/order", { background: location });
  };

  return (
    <div className={"mt-10 " + styles.mainContainer} ref={dropTarget}>
      <div className={"ml-6 "}>
        {constructorIngredients.bread && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={constructorIngredients.bread.name + "\n(верх)"}
            price={constructorIngredients.bread.price}
            thumbnail={constructorIngredients.bread.image}
          />
        )}
      </div>
      <div className={styles.ingContainer}>
        {constructorIngredients.ingredients.map((el, ind) => (
          <DraggableElement
            key={el.listId}
            element={el}
            deleteItem={removeIngredient}
            index={ind}
          />
        ))}
      </div>
      <div className={"ml-6 "}>
        {constructorIngredients.bread && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={constructorIngredients.bread.name + "\n(низ)"}
            price={constructorIngredients.bread.price}
            thumbnail={constructorIngredients.bread.image}
          />
        )}
      </div>
      <div className={"mt-10 mr-4 " + styles.totalContainer}>
        <p className={"text text_type_digits-default pl-10 pr-10"}>
          {constructorIngredients.ingredients.reduce(
            (sum : number, el : TIngredient) => sum + el.price,
            0
          ) +
            2 *
              (constructorIngredients.bread
                ? constructorIngredients.bread.price
                : 0)}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="medium"
          onClick={makeOrder}
          htmlType="button"
        >
          Оформить заказ
          <ClipLoader
            loading={orderLoading}
            size={"1.5em"}
            color={"white"}
            aria-label="Loading Spinner"
          />
        </Button>
      </div>
    </div>
  );
}

type TGapProps = {
  index: number,
};

const Gap : FC<TGapProps> = ({ index }) => {
  const dispatch = useDispatch();
  const onDropHandler = (itemId: any) => {
    dispatch({ type: CHANGE_INGREDIENT_POSITION, id: itemId, index });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "draggableIngredient",
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  return (
    <div
      ref={dropTarget}
      className={styles.gap + " " + (isHover ? styles.activeGap : "")}
    ></div>
  );
}

type TDraggableElementProps = {
  element: TIngredient,
  deleteItem: any,
  index: number,
};

const DraggableElement : FC<TDraggableElementProps> = ({ element, deleteItem, index }) =>  {
  const [{ isDrag }, dragRef] = useDrag({
    type: "draggableIngredient",
    item: { id: element.listId },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
      <>
          {!isDrag && (
        <>
        {index == 0 && <Gap index={0} />}
        <div ref={dragRef}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image}
            handleClose={() => deleteItem(element.listId!)}
          />
        </div>
        <Gap index={index + 1} />
        </>
        )}
      </>
  );
}

export default BurgerConstructor;
