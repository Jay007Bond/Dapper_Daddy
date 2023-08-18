import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productList.css';
import Sidebar from "./Sidebar"
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { clearBannerErrors, deleteBanner, getAllBanners } from '../../actions/bannerAction';
import { DELETE_BANNER_RESET } from '../../constants/bannerConstants';


const BannerList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { error, banners } = useSelector((state) => state.banners);
    const { error: deleteError, isDeleted } = useSelector((state) => state.banner);

    const deleteBannerHandler = (id) => {
        dispatch(deleteBanner(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearBannerErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearBannerErrors());
        }

        if (isDeleted) {
            alert.success('Banner Deleted Successfully');
            navigate('/admin/banners');
            dispatch({ type: DELETE_BANNER_RESET });
        }

        dispatch(getAllBanners());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);




    const columns = [
        { field: 'id', headerName: 'Banner ID', minWidth: 200, flex: 0.5 },
        { field: 'images', headerName: 'Images', minWidth: 350, flex: 1, renderCell: (params) => <img src={params.value} alt="Banner" style={{ width: '100px', height: 'auto' }} /> },
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
                        <Link to={`/admin/banner/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteBannerHandler(params.getValue(params.id, 'id'))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment >
                );
            },
        },
    ];

    const rows = [];

    banners &&
        banners.forEach((item) => {
            rows.push({
                id: item._id,
                images: item.images[0]?.url,
            })
        })


    return (
        <Fragment>
            <MetaData title={`ALL BANNERS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL BANNERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default BannerList;
