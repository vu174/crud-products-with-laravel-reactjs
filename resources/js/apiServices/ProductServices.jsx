import * as request from "../utils/request";
import iziToast from "../components/toast/Index";

export const get = async () => {
    try {
        return await request.get("products");
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
        await request.post("add_product", data);
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
        return await request.get(`products/${id}/edit`);
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
        await request.post(`products/${id}/update`, data);
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