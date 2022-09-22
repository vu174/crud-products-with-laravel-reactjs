import React from "react";

import routerConfig from "../config/Routes";
import IndexProduct from "../components/Products/Index";
import NotFound from "../components/NotFound";

const publicRoutes = [
    { path: routerConfig.home, component: IndexProduct },
    { path: routerConfig.notFound, component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
