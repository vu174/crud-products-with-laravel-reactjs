import * as request from "../utils/request";
import iziToast from "../components/toast/Index";
import { routesApi } from "../config/Routes";
import { replaceRouteApi } from "../utils/commom";

export const get = async () => {
    try {
        return await request.get(routesApi.listProduct);
    } catch (e) {
        let errorObject = e.response.data !== undefined ? e.response.data.errors : {};
        if (errorObject) {
            Object.values(errorObject).map((error) => {
                iziToast("error", "Error!", error);
            });
        }
        return null;
    }
};

export const store = async (data = {}) => {
    try {
        await request.post(routesApi.addProduct, data);
        iziToast("success", "Success!", "Product added!");
        return true;
    } catch (e) {
        let errorObject = e.response.data !== undefined ? e.response.data.errors : {};
        if (errorObject) {
            Object.values(errorObject).map((error) => {
                iziToast("error", "Error!", error);
            });
        }
        return null;
    }
};

export const edit = async (id = null) => {
    try {
        return await request.get(replaceRouteApi(routesApi.editProduct, 'id', id));
    } catch (e) {
        let errorObject = e.response.data !== undefined ? e.response.data.errors : {};
        if (errorObject) {
            Object.values(errorObject).map((error) => {
                iziToast("error", "Error!", error);
            });
        }
        return null;
    }
};

export const update = async (id = null, data = {}) => {
    try {
        await request.post(replaceRouteApi(routesApi.updateProduct, 'id', id), data);
        iziToast("success", "Success!", "Product updated!");
        return true;
    } catch (e) {
        let errorObject = e.response.data !== undefined ? e.response.data.errors : {};
        if (errorObject) {
            Object.values(errorObject).map((error) => {
                iziToast("error", "Error!", error);
            });
        }
        return null;
    }
};

export const deleteProduct = async (id = null) => {
    try {
        await request.get(`products/${id}/delete`);
        iziToast("success", "Success!", "Product deleted!");
        return true;
    } catch (e) {
        let errorObject = e.response.data !== undefined ? e.response.data.errors : {};
        if (errorObject) {
            Object.values(errorObject).map((error) => {
                iziToast("error", "Error!", error);
            });
        }
        return null;
    }
};
