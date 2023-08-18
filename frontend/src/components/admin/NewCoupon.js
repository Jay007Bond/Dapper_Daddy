import React, { Fragment, useEffect, useState } from "react";
import "./updateBanner.css"
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { clearCouponError, createCoupon } from "../../actions/couponAction";
import { COUPON_CREATE_RESET } from "../../constants/couponConstants";


const NewCoupon = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.createCoupon);

    const [code, setName] = useState("");
    const [discount, setDiscount] = useState("");
    const [expiry, setExpiry] = useState("");




    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearCouponError());
        }

        if (success) {
            alert.success("Coupon Created Successfully");
            history("/admin/coupons");
            dispatch({ type: COUPON_CREATE_RESET })
        }
    }, [dispatch, alert, error, history, success]);


    const createCouponSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("code", code);
        myForm.set("discountAmount", discount);
        myForm.set("expiryDate", expiry);



        dispatch(createCoupon(myForm));
    };



    return (
        <Fragment>
            <MetaData title="Create New Coupon" />
            <div className="dashboard">
                <SideBar />
                <div className="newBannerContainer">
                    <h1 id="productListHeading">Create New Coupon Code</h1>
                    <form className="createBannerForm" encType="multipart/form-data" onSubmit={createCouponSubmitHandler} >
                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Coupon code"
                                required
                                value={code}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Discount or price"
                                required
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="date"
                                placeholder="Expire-Date"
                                required
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            />
                        </div>



                        <Button id="createBannerBtn" type="submit" disabled={loading ? true : false} >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewCoupon;