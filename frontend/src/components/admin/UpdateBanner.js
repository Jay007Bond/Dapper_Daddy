import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router";
import { clearBannerErrors, updateBanner, getBannerById } from "../../actions/bannerAction";
import { UPDATE_BANNER_RESET } from "../../constants/bannerConstants";
import "./updateBanner.css"



const UpdateProduct = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const alert = useAlert();

    const { error, banner } = useSelector((state) => state.bannerDetails);

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.updateBanner);


    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const bannerId = params.id;

    useEffect(() => {
        if (banner && banner._id !== bannerId) {
            dispatch(getBannerById(bannerId));
        } else {
            setOldImages(banner?.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearBannerErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearBannerErrors());
        }

        if (isUpdated) {
            alert.success("Banner Updated Successfully");
            history("/admin/banners");
            dispatch({ type: UPDATE_BANNER_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, bannerId, banner, updateError]);

    const updateBannerSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateBanner(bannerId, myForm));
    };

    const updateBannerImagesChange = (e) => {
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

    return (
        <Fragment>
            <MetaData title="Create Banner" />
            <div className="dashboard">
                <SideBar />
                <div className="newBannerContainer">
                    <h1 id="productListHeading">Update Banner</h1>
                    <form
                        className="createBannerForm"
                        encType="multipart/form-data"
                        onSubmit={updateBannerSubmitHandler}
                    >


                        <div id="createBannerFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateBannerImagesChange}
                                multiple
                            />
                        </div>


                        <div id="createBannerFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Banner Preview" />
                                ))}
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
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;