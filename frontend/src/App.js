import React from "react";
import "./App.css";
import Login from "./components/Loginpage/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from "react-dom";
import MainPage from "./components/Mainpage/Mainpage";
import View from "./components/View/View";
function App() {
  return (
    <Router>
      <div className='App'>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/main'>
          <MainPage />
        </Route>
        <Route path='/view'>
          <View />
        </Route>
      </div>
    </Router>
  );
}

export default App;
