import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as ProductService from "../../apiServices/ProductServices";
import * as AddProductService from "@/apiServices/ProductServices";
import { deleteProduct } from "../../apiServices/ProductServices";

const Index = () => {
    const navigate = useNavigate();

    const newProduct = () => {
        navigate("/product/new");
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let res = await ProductService.get();
        setProducts(res.products);
    };

    const handleEditProduct = (id) => {
        navigate(`/product/edit/${id}`);
    };

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const fetchApi = await ProductService.deleteProduct(id);
                if (fetchApi) {
                    getProducts();
                }
            }
        });
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

                {products.map((product, index) => {
                    return (
                        <div className="table--items products__list__item" key={product.id}>
                            <div className="products__list__item--imgWrapper">
                                <img
                                    className="products__list__item--img"
                                    src={"/upload/" + product.photo}
                                    alt={product.name}
                                    height="40px"
                                />
                            </div>
                            <a href="#" className="table--items--col2">
                                {product.name}
                            </a>
                            <p className="table--items--col2">{product.type}</p>
                            <p className="table--items--col3">{product.quantity}</p>
                            <div>
                                <button
                                    className="btn-icon btn-icon-success"
                                    onClick={() => {
                                        handleEditProduct(product.id);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                                <button
                                    className="btn-icon btn-icon-danger"
                                    onClick={() => {
                                        handleDeleteProduct(product.id);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Index;
