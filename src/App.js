import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import ParkCar from "./Components/ParkCar.js";
import React from 'react';
import history from './Components/history';
import { Router} from 'react-router-dom'


function App() {
  return (
    <div className="App">
    {/* <Router history={history}>  */}
    <BrowserRouter> 
        <Switch>
          <Route exact path="/"  component={Login} />
          <Route  path="/main"  component={ParkCar} />
        </Switch>
    </BrowserRouter>

    </div>
  );
}

export default App;
