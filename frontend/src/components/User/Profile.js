import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { ExitToApp, AccountCircle, Assignment, Edit, Lock } from "@material-ui/icons";
import "./Profile.css";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";


const Profile = () => {
    const history = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
        history("/");
    }

    useEffect(() => {
        if (!isAuthenticated) {
            history("/login");
        }
    }, [history, isAuthenticated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />

                    <div className="userprofile">
                        <div className="userprofilein">
                            <div className="left">
                                <div className="usersidebar">
                                    <Link to="/account" className="stylenone s1">
                                        <AccountCircle />
                                        <span>Account</span>
                                    </Link>

                                    <Link to="/orders" className="stylenone s1">
                                        <Assignment />
                                        <span>My Orders</span>
                                    </Link>

                                    <Link to="/me/update" className="stylenone s1">
                                        <Edit />
                                        <span>Edit Profile</span>
                                    </Link>

                                    <Link to="/password/update" className="stylenone s1">
                                        <Lock />
                                        <span>Change Password</span>
                                    </Link>

                                    <Link onClick={(e) => logoutUser()} className="stylenone s1">
                                        <ExitToApp />
                                        <span>Logout</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="right">
                                <div className="accountsettings">
                                    <h1 className="mainhead1">My Profile</h1>


                                    <div className="form">
                                        <div className="form-group">
                                            <label htmlFor="name" >
                                                Full Name
                                            </label>
                                            <div>{user.name}</div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">
                                                Email
                                            </label>
                                            <div>{user.email}</div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone">
                                                Join At
                                            </label>
                                            <div>{String(user.createdAt).substr(0, 10)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;
