import React from 'react';
import styles from './ingredient-details.module.css';

function IngredientDetails({name,image,description,cals,proteins,carbs,fats}){
  return (
    <>
        <img src={image} className={styles.img}/>
    <p className="text text_type_main-medium">{name}</p>
    <p className="text text_type_main-default ">{description}</p>
    <div className={styles.nutritionContainer}>
    <NutritionInfo title={"Калории,ккал"} info={cals}/>
    <NutritionInfo title={"Белки,г"} info={proteins}/>
    <NutritionInfo title={"Жиры,г"} info={fats}/>
    <NutritionInfo title={"Углеводы,г"} info={carbs}/>
    </div>
    </>
  )
}

function NutritionInfo({title,info}){
return (
<div>
<p className="text text_type_main-default text_color_inactive">{title}</p>
<p className="text text_type_digits-default text_color_inactive">{info}</p>
</div>)
}



export default IngredientDetails;
