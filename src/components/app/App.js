import React from 'react';
import logo from './logo.svg';
// import {data} from '../../utils/data.js'
import './App.css';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import OrderDetails from '../order-details/OrderDetails';
import IngredientsDetails from '../ingredient-details/IngredientDetails';
import Modal from '../modal/Modal';

function App() {
  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const [state, setState] = React.useState({
  ingredients: [],
  loading: true,
  error:false
})
const [modal, setModal] = React.useState({opened:false,content:null,title:null});
  React.useEffect(()=>{
  fetch(URL)
  .then(res=>res.json())
  .then(data=>{console.log(data);setState({error:!data.success,ingredients:data.data,loading:false})})
  .catch(error=>setState({...state,error:error,loading:false})
  )
  },[])

  const closeModal = () => setModal({opened:false,content:null,title:null});

  const showIngredientInfo = (id) => {
    let item = state.ingredients.find(i=>i._id===id);
    console.log(item)
    if(!item) return;
    let content = <IngredientsDetails
    name={item.name}
    image={item.image}
    description= {item.description ?? "Описания пока нет"}
    cals={item.calories}
    proteins={item.proteins}
    carbs={item.carbohydrates}
    fats={item.fat}
    />;
    setModal({opened:true,content:content,title:"Детали ингредиента"})
  }

  const showOrderInfo = () => {
    let content = <OrderDetails
    />;
    setModal({opened:true,content:content,title:null})
  }

  return (
    <div className="App">
    {modal.opened && <Modal title={modal.title} content={modal.content} close={closeModal}/>}
    <header>
    <AppHeader/>
    </header>
    {state.loading && <p className={"text text_type_digits-default"}> loading...</p>}
    {state.error && <p className={"text text_type_digits-default"}> server error</p>}
    {!state.loading && !state.error &&
    <main>
    <section>
    <BurgerIngredients ingredients={state.ingredients} onItemClick={showIngredientInfo}/>
    </section>
    <section>
    <BurgerConstructor ingredients={state.ingredients} showOrderInfo={showOrderInfo}/>
    </section>
    </main>
  }
    </div>
  );
}

export default App;
