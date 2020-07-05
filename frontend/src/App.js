import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import RegisterPage from "./pages/registerpage";
import DashboardPage from "./pages/dashboardpage";
import IndexPage from "./pages/indexpage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/dashboard" component={DashboardPage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;