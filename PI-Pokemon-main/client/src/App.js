
import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home';
import CreatePokemon from './Components/CreatePokemon';

function App() {
  return (
    <div >
      <Route exact path='/' component={Landing}/>
      <Route path ='/home' component={Home}/>
      <Route path ='/pokemons' component={CreatePokemon}/>
    </div>
  );
}

export default App;
