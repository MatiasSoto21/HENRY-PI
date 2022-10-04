
import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home';
import CreatePokemon from './Components/CreatePokemon';
import Detail from './Components/Detail';

function App() {
  return (
    <div >
      <Route exact path='/' component={Landing}/>
      <Route path ='/home' component={Home}/>
      <Route path ='/pokemons' component={CreatePokemon}/>
      <Route path='/detail/:id' component={Detail}/>
    </div>
  );
}

export default App;
