import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    useEffect(() => {
        if (user && user.token) {
            navigate("/");
        }
    }, [user, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };
        await sendSignInLinkToEmail(auth, email, config);
        toast.success(
            `Email is sent to ${email}. Click the link to complete registration`
        );
        // Save the user email in the local storage for future useage
        window.localStorage.setItem("emailForRegistration", email);
        // clear the email state now
        setEmail("");
    };
    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                placeholder="Enter Email"
            />
            <button type="submit" className="btn btn-raised mt-3">
                Register
            </button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;
