import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productList.css';
import Sidebar from "./Sidebar"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import { clearCouponError, deleteCoupon, getAllCoupons } from '../../actions/couponAction';
import { COUPON_DELETE_RESET } from '../../constants/couponConstants';


const CouponList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { error, coupons } = useSelector((state) => state.couponGetAll);
    const { error: deleteError, isDeleted } = useSelector((state) => state.deleteCoupon);

    const deleteCouponHandler = (id) => {
        dispatch(deleteCoupon(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearCouponError());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearCouponError());
        }

        if (isDeleted) {
            alert.success('Coupon Deleted Successfully');
            navigate('/admin/coupons');
            dispatch({ type: COUPON_DELETE_RESET });
        }

        dispatch(getAllCoupons());
    }, [dispatch, alert, error, isDeleted, deleteError, navigate]);




    const columns = [
        { field: 'id', headerName: 'Coupon ID', minWidth: 200, flex: 0.5 },
        { field: 'code', headerName: 'Coupon-Code', minWidth: 200, flex: 0.5 },
        { field: 'discount', headerName: 'Discount', minWidth: 200, flex: 0.5 },
        { field: 'expiry', headerName: 'Expire Date', minWidth: 200, flex: 0.5 },

        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button onClick={() => deleteCouponHandler(params.getValue(params.id, 'id'))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment >
                );
            },
        },
    ];

    const rows = [];

    coupons &&
        coupons.forEach((item) => {
            rows.push({
                id: item._id,
                code: item.code,
                discount: item.discountAmount,
                expiry: item.expiryDate,
            })
        })


    return (
        <Fragment>
            <MetaData title={`ALL COUPON CODE  - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL COUPON CODE</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default CouponList;
