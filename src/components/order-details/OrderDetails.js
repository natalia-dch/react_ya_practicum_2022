import React from 'react';
import styles from './order-details.module.css';
import doneImg from '../../images/done.svg'

function OrderDetails(props){
  return (
    <div className={styles.container}>
    <p className="text text_type_digits-large">123456</p>
    <p className="text text_type_main-medium">идентификатор заказа</p>
    <img src={doneImg} />
    <p className="text text_type_main-default">Ваш заказ начали готовить</p>
    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>

    </div>
  )
}



export default OrderDetails;
