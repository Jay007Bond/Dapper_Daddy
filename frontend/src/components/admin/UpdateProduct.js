import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    updateProduct,
    getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import { LocalOffer } from "@material-ui/icons";


const UpdateProduct = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const alert = useAlert();

    const { error, product } = useSelector((state) => state.productDetails);

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [oldprice, setOldPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [imagess, setImagess] = useState([]);
    const [oldImagess, setOldImagess] = useState([]);
    const [imagesPreviewss, setImagesPreviewss] = useState([]);

    const [imagesss, setImagesss] = useState([]);
    const [oldImagesss, setOldImagesss] = useState([]);
    const [imagesPreviewsss, setImagesPreviewsss] = useState([]);


    const categories = [
        "Hair",
        "Face",
        "Beard",
    ];

    const productId = params.id;

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setOldPrice(product.oldprice);
            setDiscount(product.discount);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
            setOldImagess(product.banner);
            setOldImagesss(product.banners);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Product Updated Successfully");
            history("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, productId, product, updateError]);

    const updateProductSubmitHandler = (e) => {
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
        dispatch(updateProduct(productId, myForm));
    };

    // 1 product image
    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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

    // 2 productBanner image
    const updateBannerImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImagess([]);
        setImagesPreviewss([]);
        setOldImagess([]);

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

    // 3 productBanner image
    const updateBannersssImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesss([]);
        setImagesPreviewsss([]);
        setOldImagesss([]);

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
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>

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
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Old Price"
                                required
                                onChange={(e) => setOldPrice(e.target.value)}
                                value={oldprice}
                            />
                        </div>
                        <div>
                            <LocalOffer />
                            <input
                                type="number"
                                placeholder="Discount"
                                required
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
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
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
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
                                value={Stock}
                            />
                        </div>


                        {/* product */}
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>





                        {/* bannerss */}
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateBannersssImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImagesss &&
                                oldImagesss.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Banner Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreviewsss.map((image, index) => (
                                <img key={index} src={image} alt="Banner Preview" />
                            ))}
                        </div>


                        {/* banner */}
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateBannerImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImagess &&
                                oldImagess.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Banner Preview" />
                                ))}
                        </div>


                        <div id="createProductFormImage">
                            {imagesPreviewss.map((image, index) => (
                                <img key={index} src={image} alt="Banner Preview" />
                            ))}
                        </div>


                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;