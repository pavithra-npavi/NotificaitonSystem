import React from "react";
import {Switch, Route} from "react-router-dom"
import Branch from "./Branch";
import Home from "./Home"

import Login from "./Login"

const AllRoutes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login/>
        </Route>
        <Route path="/branch">
          <Branch/>
        </Route>
        <Route>
        <p>PAGE NOT FOUND </p>
        </Route>
      </Switch>
    </div>
  );
};

export default AllRoutes;


//loation.pathname