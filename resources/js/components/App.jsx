import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { publicRoutes } from "../router/Router";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
