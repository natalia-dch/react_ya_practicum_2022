import React from 'react';
// import styles from './order-details.module.css';
import doneImg from '../../images/done.svg'

function OrderDetails(props){
  return (
    <>
    <p className="text text_type_digits-large">123456</p>
    <p className="text text_type_main-medium">Ваш заказ начали готовить</p>
    <p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
    <img src={doneImg} />
    </>
  )
}



export default OrderDetails;
