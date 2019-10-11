import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import AddProduct from "./components/products/AddProduct";

// Check if the user is already authenticated

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode the tokens ang get user infe ormation
  const decodedToken = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedToken));
  //Check for expired tokens
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    // log out user
    store.dispatch(logoutUser());
    // Set profile to null
    // store.dispatch(clearProfile());
    // clear current Profile
    // TODO:::TODO
    // Redirect to login
    window.alert("Session expired, please login again.");
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <Router>
            <Route exact path="/" render={() => <Navbar />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/dashboard" render={() => <Dashboard />} />
            <Route exact path="/add-products" render={() => <AddProduct />} />
          </Router>
        </Provider>
        <h1> </h1>
      </div>
    );
  }
}

export default App;
