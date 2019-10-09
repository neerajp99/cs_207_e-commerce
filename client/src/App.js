import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard"

function App() {
  return (
    <div className="app">
      <Router>
        <Route exact path="/" render={() => <Navbar />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/dashboard" render={() => <Dashboard />} />

      </Router>
      <h1> </h1>
    </div>
  );
}

export default App;
