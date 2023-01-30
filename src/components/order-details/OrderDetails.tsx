import React, { useEffect } from "react";
import styles from "./order-details.module.css";
import doneImg from "../../images/done.svg";
import { order } from "../../services/actions/order";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { TIngredient } from "../../utils/types";

function OrderDetails() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const ingredients = useAppSelector(
    (store) => store.constructorIngredients.ingredients
  );
  const bread = useAppSelector((store) => store.constructorIngredients.bread);
  const orderLoading = useAppSelector((state) => state.order.orderRequest);
  const orderError = useAppSelector((state) => state.order.orderError);
  useEffect(() => {
    const ingredientIds = ingredients.map((i) => i._id);
    if (bread) {
      dispatch(order([...ingredientIds, bread._id, bread._id]));
    } else {
      dispatch(order([...ingredientIds]));
    }
  }, []);
  // useEffect(() => {
  //   if (orderError) history.push("/");
  // }, [orderError]);
  const orderInfo = useAppSelector((state) => state.order.order);
  const orderNum = orderInfo?.number;
  return (
    <>
      {!orderLoading ? (
        <div className={styles.container}>
          {orderError ? (
            <p className="text text_type_main-default mt-15 mb-15">
              Ошибка при выполнении заказа
            </p>
          ) : (
            <>
              <p className="text text_type_digits-large mt-30 mb-8">
                {orderNum}
              </p>
              <p className="text text_type_main-medium mb-15">
                идентификатор заказа
              </p>
              <img src={doneImg} alt='символ "галочка"' className="mb-15" />
              <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
              </p>
              <p className="text text_type_main-default text_color_inactive mb-30">
                Дождитесь готовности на орбитальной станции
              </p>
            </>
          )}
        </div>
      ) : (
        <p className="text text_type_main-default mt-15 mb-15">Загрузка</p>
      )}
    </>
  );
}

export default OrderDetails;
