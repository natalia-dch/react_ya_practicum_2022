import { Ingredient } from "../pages/order-details/order-details-page";

export type TIngredient = {
  __v: number;
  _id: string,
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large?: string,
  image_mobile?: string,
  name: string,
  price: number,
  proteins: number,
  type: string;
  "new entry"?: string;
  listId? : string;
};

export type TOrder = {
_id: string,
status:string,
name:string,
createdAt:string,
updatedAt:string,
number:string,
ingredients: Array<string>,
}

