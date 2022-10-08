import React from 'react';
import logo from './logo.svg';
import {data} from '../../utils/data.js'
import './App.css';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

function App() {
  return (
    <div className="App">
    <header>
    <AppHeader/>
    </header>
    <main>
    <section>
    <BurgerIngredients ingredients={data}/>
    </section>
    <section>
    <BurgerConstructor ingredients={data}/>
    </section>
    </main>
    </div>
  );
}

export default App;
