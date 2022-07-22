import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    console.log("Admin response", res);
                    setAdmin(true);
                })
                .catch((error) => {
                    console.log("Error", error);
                    setAdmin(false);
                });
        }
    }, [user]);
    return admin ? children : <LoadingToRedirect />;
};

export default AdminRoute;
