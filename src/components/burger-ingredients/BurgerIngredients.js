import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerIngredients({ingredients,onItemClick}){
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
      (el,ind) => (<Ingredient name={el.name} image={el.image} onClick={()=>{onItemClick(el._id)}} price={el.price} quantity={Math.floor(Math.random()*5)}
      key={ind} />)
    )}
    </div>
    </>

  )
}

let ingredientType = PropTypes.shape({
  __v: PropTypes.number,
  _id: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string,
  "new entry": PropTypes.string
})

BurgerIngredients.propTypes = {
  ingredients:PropTypes.arrayOf(ingredientType),
  onItemClick:PropTypes.func,
}

function Ingredient({name,image,price,quantity,onClick}){
  return(
    <div className={styles.ingredient} onClick={onClick}>
    {quantity>0 && <Counter count={quantity} size="default" />}
    <img src={image} className={styles.pic}/>
    <p className={"text text_type_digits-default"}>{price}<CurrencyIcon type="primary" /></p>
    <p className={"text text_type_main-default"}>{name}</p>
    </div>
  )
}


Ingredient.propTypes = {
  name:PropTypes.string,
  image:PropTypes.string,
  price:PropTypes.number,
  quantity:PropTypes.number,
  onClick:PropTypes.func,
}



export default BurgerIngredients;
