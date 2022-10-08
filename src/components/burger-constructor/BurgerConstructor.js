import React from 'react';
import styles from './burger-constructor.module.css';
import { Tab, CurrencyIcon, LockIcon, DeleteIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
function BurgerConstructor({ingredients,showOrderInfo}){
  let bread = ingredients[0];
  return (
    <div className={"mt-10 "+styles.mainContainer}>
    <Ingredient name={bread.name} image={bread.image} price={bread.price} locked/>
    <div className={styles.ingContainer}>
    {ingredients.map(
      (el,ind) => (<Ingredient name={el.name} image={el.image} price={el.price} key={ind}/>)
    )}
    </div>
    <Ingredient name={bread.name} image={bread.image} price={bread.price} locked />
    <div className={"mt-10 mr-4 "+styles.totalContainer}>
    <p className={"text text_type_digits-default pl-10 pr-10"}>{500}<CurrencyIcon type="primary" /></p>
    <Button type="primary"  size="medium" onClick={showOrderInfo}>
  Оформить заказ
</Button>
    </div>
    </div>

  )
}

function Ingredient({name,image,price,locked}){
  return(
    <div className={"m-4 "+(locked?"pl-6 pr-2 ":"")+styles.ingredient}>
    <div className={styles.leftContainer}>
    {!locked && <DragIcon type="primary" />}
    <img src={image} className={styles.pic}/>
    <p className={"text text_type_main-default "+styles.name}>{name}</p>
    </div>
    <div className={styles.rightContainer}>
    <p className={"text text_type_digits-default ml-5 mr-5 "+styles.price}>{price}<CurrencyIcon type="primary" /></p>
    {locked? <LockIcon type="secondary" className={"mr-8 "+styles.icon}/> : <DeleteIcon type="primary" className={styles.icon}/>}
    </div>
    </div>
  )
}


export default BurgerConstructor;
