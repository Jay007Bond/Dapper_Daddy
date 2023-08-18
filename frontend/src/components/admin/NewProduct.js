import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router";
import { LocalOffer } from "@material-ui/icons";


const NewProduct = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.newProduct);


    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [oldprice, setOldPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [imagess, setImagess] = useState([]);
    const [imagesPreviewss, setImagesPreviewss] = useState([]);
    const [imagesss, setImagesss] = useState([]);
    const [imagesPreviewsss, setImagesPreviewsss] = useState([]);


    const categories = [
        "Hair",
        "Face",
        "Beard",
    ];



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product Created Successfully");
            history("/admin/Products");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, history, success]);



    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("oldprice", oldprice);
        myForm.set("discount", discount);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        imagess.forEach((image) => {
            myForm.append("banner", image);
        });
        imagesss.forEach((image) => {
            myForm.append("banners", image);
        });
        dispatch(createProduct(myForm));
    };

    // products
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    // banner
    const createBannerImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImagess([]);
        setImagesPreviewss([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreviewss((old) => [...old, reader.result]);
                    setImagess((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    // banners
    const createBannersImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesss([]);
        setImagesPreviewsss([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreviewsss((old) => [...old, reader.result]);
                    setImagesss((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="New Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Old Price"
                                required
                                onChange={(e) => setOldPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <LocalOffer />
                            <input
                                type="number"
                                placeholder="Discount"
                                required
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>


                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />

                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        {/* product image*/}
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>



                        {/* product banners image*/}
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createBannersImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreviewsss.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        {/* product banner image*/}
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createBannerImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreviewss.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>



                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;