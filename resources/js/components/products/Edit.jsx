import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as ProductService from "../../apiServices/ProductServices";

const Edit = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const [avatar, setAvatar] = useState(true);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        getDetailsProduct();
    }, []);

    const getDetailsProduct = async () => {
        let res = await ProductService.edit(`${id}`);
        const { name, description, photo, type, quantity, price } = res.productDetails;
        setName(name);
        setDescription(description);
        setPhoto(photo);
        setType(type);
        setQuantity(quantity);
        setPrice(price);
    };

    const handleUpload = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        let limit = 1024 * 1024 * 2;
        if (file.size > limit) {
            Swal.fire({
                icon: "error",
                title: "Oops..",
                text: "File size limit is too large",
                footer: "Why do I have this issue?",
            });
        }

        setAvatar(false);

        reader.onloadend = () => {
            setPhoto(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const ourImage = (photo) => {
        return "/upload/" + photo;
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("image", photo);

        const fetchApi = await ProductService.update(id, formData);

        if (fetchApi) {
            navigate("/");
        }
    };

    return (
        <div className="container">
            <div className="products__edit">
                <div className="products__create__titlebar dflex justify-content-between align-items-center">
                    <div className="products__create__titlebar--item">
                        <h1 className="my-1">Edit Product</h1>
                    </div>
                    <div className="products__create__titlebar--item">
                        <button className="btn btn-secondary ml-1" onClick={(event) => handleUpdateProduct(event)}>
                            Save
                        </button>
                    </div>
                </div>

                <div className="products__create__cardWrapper mt-2">
                    <div className="products__create__main">
                        <div className="products__create__main--addInfo card py-2 px-2 bg-white">
                            <p className="mb-1">Name</p>
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />

                            <p className="my-1">Description (optional)</p>
                            <textarea
                                cols="10"
                                rows="5"
                                className="textarea"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                value={description ?? ''}
                            ></textarea>

                            <div className="products__create__main--media--images mt-2">
                                <ul className="products__create__main--media--images--list list-unstyled">
                                    <li className="products__create__main--media--images--item">
                                        <div className="products__create__main--media--images--item--imgWrapper">
                                            {avatar === true ? (
                                                <img
                                                    className="products__create__main--media--images--item--img"
                                                    src={ourImage(photo)}
                                                    alt={name}
                                                    height="100px"
                                                    width="117px"
                                                />
                                            ) : (
                                                <img
                                                    className="products__create__main--media--images--item--img"
                                                    src={photo}
                                                    alt={name}
                                                    height="40px"
                                                />
                                            )}
                                        </div>
                                    </li>
                                    <li className="products__create__main--media--images--item">
                                        <form className="products__create__main--media--images--item--form">
                                            <label
                                                className="products__create__main--media--images--item--form--label"
                                                htmlFor="myfile"
                                            >
                                                Add Image
                                            </label>
                                            <input
                                                className="products__create__main--media--images--item--form--input"
                                                type="file"
                                                id="myfile"
                                                onChange={handleUpload}
                                            />
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="products__create__sidebar">
                        <div className="card py-2 px-2 bg-white">
                            <div className="my-3">
                                <p>Product type</p>
                                <input
                                    type="text"
                                    className="input"
                                    value={type}
                                    onChange={(event) => {
                                        setType(event.target.value);
                                    }}
                                />
                            </div>
                            <hr />
                            <div className="my-3">
                                <p>Inventory</p>
                                <input
                                    type="text"
                                    className="input"
                                    value={quantity}
                                    onChange={(event) => {
                                        setQuantity(event.target.value);
                                    }}
                                />
                            </div>
                            <hr />
                            <div className="my-3">
                                <p>Price</p>
                                <input
                                    type="text"
                                    className="input"
                                    value={price}
                                    onChange={(event) => {
                                        setPrice(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dflex justify-content-between align-items-center my-3">
                    <p></p>
                    <button className="btn btn-secondary" onClick={(event) => handleUpdateProduct(event)}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Edit;
