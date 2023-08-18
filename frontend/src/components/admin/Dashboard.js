import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData.js";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);


    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });



    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["rgb(90 184 36)"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#d71010", "rgb(90 184 36)"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products?.length - outOfStock],
            },
        ],
    };

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Admin Dashboard</Typography>

                <div className="dashboardSummary">
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>All Products</p>
                            <h2>{products && products?.length}</h2>
                        </Link>
                        <Link to="/admin/orders">
                            <p>All Orders</p>
                            <h2>{orders && orders?.length}</h2>
                        </Link>
                        <Link to="/admin/users">
                            <p>All Users</p>
                            <h2>{users && users?.length}</h2>
                        </Link>
                        <Link>
                            <p className="colors">Total Amount</p>
                            <h2 className="color">₹{totalAmount}</h2>
                        </Link>
                    </div>

                </div>

                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;