import React from 'react';
import logo from './logo.svg';
// import {data} from '../../utils/data.js'
import './App.css';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

function App() {
  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const [state, setState] = React.useState({
  ingredients: [],
  loading: true,
  error:false
})
  React.useEffect(()=>{
  fetch(URL)
  .then(res=>res.json())
  .then(data=>{console.log(data);setState({error:!data.success,ingredients:data.data,loading:false})})
  .catch(error=>setState({...state,error:error,loading:false})
  )
  },[])
  return (
    <div className="App">
    <header>
    <AppHeader/>
    </header>
    {state.loading && <p className={"text text_type_digits-default"}> loading...</p>}
    {state.error && <p className={"text text_type_digits-default"}> server error</p>}
    {!state.loading && !state.error &&
    <main>
    <section>
    <BurgerIngredients ingredients={state.ingredients}/>
    </section>
    <section>
    <BurgerConstructor ingredients={state.ingredients}/>
    </section>
    </main>
  }
    </div>
  );
}

export default App;
