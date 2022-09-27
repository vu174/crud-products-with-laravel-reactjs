import React from "react";

import routerConfig from "../config/Routes";
import IndexProduct from "../components/products/Index";
import NewProduct from "../components/products/New";
import EditProduct from "../components/products/Edit";
import NotFound from "../components/NotFound";

const publicRoutes = [
    { path: routerConfig.home, component: IndexProduct },
    { path: routerConfig.newProduct, component: NewProduct },
    { path: routerConfig.editProduct, component: EditProduct },
    { path: routerConfig.notFound, component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
