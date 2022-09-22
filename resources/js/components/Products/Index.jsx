import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();

    const newProduct = () => {
        navigate("/product/new");
    };

    return (
        <div className="container">
            <div className="products__list table my-3">
                <div className="customers__titlebar dflex justify-content-between align-items-center">
                    <div className="customers__titlebar--item">
                        <h1 className="my-1">Products</h1>
                    </div>
                    <div className="customers__titlebar--item">
                        <button className="btn btn-secondary my-1" onClick={() => newProduct()}>
                            Add Product
                        </button>
                    </div>
                </div>

                <div className="table--heading mt-2 products__list__heading">
                    <p className="table--heading--col1">Image</p>
                    <p className="table--heading--col2">Product</p>
                    <p className="table--heading--col4">Type</p>
                    <p className="table--heading--col3">Inventory</p>
                    <p className="table--heading--col5">Actions</p>
                </div>

                <div className="table--items products__list__item">
                    <div className="products__list__item--imgWrapper"></div>
                    <a href="#" className="table--items--col2">
                        Product name
                    </a>
                    <p className="table--items--col2">type</p>
                    <p className="table--items--col3">10</p>
                    <div>
                        <button className="btn-icon btn-icon-success">
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button className="btn-icon btn-icon-danger">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
