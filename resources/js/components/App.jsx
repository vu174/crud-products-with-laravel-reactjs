import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {publicRoutes} from "../router/Router";

const App = () => {

    return (
      <Router>
          <Routes>
              {
                  publicRoutes.map((route, index) => {
                      return <Route key={index} path={route.path} element={route.component}/>
                  })
              }
          </Routes>
      </Router>
    );
}

export default App;
