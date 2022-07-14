import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    useEffect(() => {
        if (user && user.token) {
            navigate("/");
        }
    }, [user, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };
        await sendPasswordResetEmail(auth, email, config)
            .then(() => {
                setEmail("");
                setLoading(false);
                toast.success("Check your email for password reset link");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                toast.error(error.message);
            });
    };
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            <h4>Forgot Password</h4>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                />
                <br />
                <button className="btn btn-raised" disabled={!email}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
