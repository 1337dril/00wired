import { useEffect } from "react";
import { themeChange } from "theme-change";
import { Redirect, Route, Switch } from "wouter";
import Application from "./pages/Application";
import FrontPage from "./pages/FrontPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <Switch>
      <Route path="/">
        <FrontPage />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/app">
        <Redirect to="/app/dashboard" />
      </Route>
      <Route path="/app/:ch">
        {(params) => <Application ch={params.ch} />}
      </Route>
    </Switch>
  );
}
