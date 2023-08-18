import React from "react";
import "./sidebar.css";
import logo from "../../image/blacklogo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import { LocalOffer, ShoppingBasket } from '@material-ui/icons';


const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon /> Dashboard
                </p>
            </Link>

            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<PhotoLibraryIcon />}
                >
                    <TreeItem nodeId="1" label="Banners">
                        <Link to="/admin/banners">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/banner">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>

            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ShoppingBasket />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>

            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<LocalOffer />}
                >
                    <TreeItem nodeId="1" label="Coupon Code">
                        <Link to="/admin/coupons">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/coupon">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>


            <Link to="/admin/orders">
                <p className="para">
                    <ListAltIcon />
                    Orders
                </p>
            </Link>

            <Link to="/admin/users">
                <p className="para">
                    <PeopleIcon /> Users
                </p>
            </Link>

            <Link to="/admin/reviews">
                <p className="para">
                    <RateReviewIcon />
                    Reviews
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;