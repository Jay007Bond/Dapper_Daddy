import React, { Fragment, useState } from "react";
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
    const history = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const { cartItems } = useSelector((state) => state.cart);

    const options = [
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: (
                <ShoppingCartIcon
                    style={{
                        color: cartItems.length > 0 ? "#000" : "unset",
                    }}
                />
            ),
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <ListAltIcon />, name: "Orders", func: orders },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        history("/admin/dashboard");
    }

    function orders() {
        history("/orders");
    }
    function account() {
        history("/account");
    }
    function cart() {
        history("/cart");
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
        history("/");
    }

    // Helper function to get the first letter of the user's name
    function getFirstLetter() {
        if (user.name && user.name.length > 0) {
            return user.name.charAt(0).toUpperCase();
        }
        return "";
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11", flexDirection: "column-reverse" }}
                open={open}
                direction="down"
                className="speedDial"
                // Update the icon prop to display the first letter of the user's name
                icon={<div className="speedDialIcon">{getFirstLetter()}</div>}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;
