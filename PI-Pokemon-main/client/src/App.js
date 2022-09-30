
import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home';

function App() {
  return (
    <div >
      <Route exact path='/' component={Landing}/>
      <Route path ='/home' component={Home}/>
    </div>
  );
}

export default App;
