import React, { Fragment, useEffect, useState } from "react";
import "./updateBanner.css"
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router";
import { clearBannerErrors, createBanner } from "../../actions/bannerAction";
import { NEW_BANNER_RESET } from "../../constants/bannerConstants";


const NewProduct = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.newBanner);


    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearBannerErrors());
        }

        if (success) {
            alert.success("Banner Created Successfully");
            history("/admin/Banners");
            dispatch({ type: NEW_BANNER_RESET });
        }
    }, [dispatch, alert, error, history, success]);


    const createBannerSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createBanner(myForm));
    };


    const createBannerImagesChange = (e) => {
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

    return (
        <Fragment>
            <MetaData title="Create Banner" />
            <div className="dashboard">
                <SideBar />
                <div className="newBannerContainer">
                    <h1 id="productListHeading">Create New Banner</h1>
                    <form
                        className="createBannerForm"
                        encType="multipart/form-data"
                        onSubmit={createBannerSubmitHandler}
                    >



                        <div id="createBannerFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createBannerImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createBannerFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Banner Preview" />
                            ))}
                        </div>

                        <Button
                            id="createBannerBtn"
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