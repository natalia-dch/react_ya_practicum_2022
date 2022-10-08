import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients({ingredients}){
  const [current, setCurrent] = React.useState('buns')
  return (
    <>
    <p className={`text text_type_main-medium ml-2 mr-2 `+styles.subheader}>
     Соберите бургер
    </p>
    <div style={{ display: 'flex'}}>
      <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauses" active={current === 'sauses'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="stuffing" active={current === 'stuffing'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
    <div className={styles.ingContainer}>
    {ingredients.map(
      (el) => (<Ingredient name={el.name} image={el.image} price={el.price} quantity={Math.floor(Math.random()*5)}/>)
    )}
    </div>
    </>

  )
}

function Ingredient({name,image,price,quantity}){
  return(
    <div className={styles.ingredient}>
    {quantity>0 && <Counter count={quantity} size="default" />}
    <img src={image} className={styles.pic}/>
    <p className={"text text_type_digits-default"}>{price}<CurrencyIcon type="primary" /></p>
    <p className={"text text_type_main-default"}>{name}</p>
    </div>
  )
}

export default BurgerIngredients;
