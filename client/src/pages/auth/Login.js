import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthprovider } from "../../firebase";
import { Link } from "react-router-dom";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    // Role based redirect function
    const roleBasedRedirect = (res) => {
        if (res.data.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/user/history");
        }
    };

    // Google login
    const googleLogin = async () => {
        await signInWithPopup(auth, googleAuthprovider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        const { name, email, role, _id } = res.data;
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name,
                                email,
                                token: idTokenResult.token,
                                role,
                                _id,
                            },
                        });
                        roleBasedRedirect(res);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    const { name, email, role, _id } = res.data;
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name,
                            email,
                            token: idTokenResult.token,
                            role,
                            _id,
                        },
                    });
                    roleBasedRedirect(res);
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user && user.token) {
            navigate("/");
        }
    }, [user, navigate]);
    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="your Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                placeholder="Enter Email"
            />
            <br />
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
            />
            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                block
                shape="round"
                className="mb-3"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || !password || password.length < 6}
            >
                {loading ? "Loading..." : "Login with Email"}
            </Button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
                    <Button
                        onClick={googleLogin}
                        type="danger"
                        block
                        shape="round"
                        className="mb-3"
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Google Login
                    </Button>
                    <Link
                        to="/forgot/password"
                        className="float-right text-danger"
                    >
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
