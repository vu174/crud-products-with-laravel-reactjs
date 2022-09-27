const routes = {
    home: "/",
    newProduct: "/product/new",
    editProduct: "/product/edit/:id",
    notFound: "/*",
};

export const routesApi = {
    listProduct: "products",
    addProduct: "product/add",
    editProduct: "product/:id/edit",
    updateProduct: "product/:id/update",
    deleteProduct: "product/:id/delete",
};

export default routes;
