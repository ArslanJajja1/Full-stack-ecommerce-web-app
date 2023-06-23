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
      navigate(-1);
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
          .catch((error) => {});
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleRecruiterSubmit = (e)=>{
    e.preventDefault()
    setEmail('arslanjajja13@gmail.com')
    setPassword('password')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
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
        .catch((error) => {});
    } catch (error) {
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
        className="form-control text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Enter Email"
      />
      <br />
      <input
        type="password"
        className="form-control text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
      />
      <br />
      <Button
        onClick={handleRecruiterSubmit}
        type="primary"
        block
        style={{ color: "#2c2c6c", letterSpacing: "1px" }}
        className="btn mt-2 bg-white font-weight-bold btn-raised"
        icon={<MailOutlined />}
        size="large"
      >
        Recruiter Login
      </Button>
      <Button
        onClick={handleSubmit}
        type="primary"
        block
        style={{ color: "#2c2c6c", letterSpacing: "1px" }}
        className="btn mt-2 bg-white font-weight-bold btn-raised"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || !password || password.length < 6}
      >
        {loading ? "Loading..." : "Email Login"}
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div
          className="col-md-6 offset-md-3 col-sm-12 text-white p-4 text-center shadow-lg bg-body productCard-container"
          style={{
            backgroundColor: "#2c2c6c",
            marginTop: "3.2rem",
            width:"min-content"
          }}
        >
          <h4
            style={{
              letterSpacing: "3px",
              borderBottom: "5px solid #4db5ff",
              width: "fit-content",
            }}
            className="text-white font-weight-bold text-center pb-2 mx-auto"
          >
            Login
          </h4>
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            block
            className="mb-3 font-weight-bold btn-raised"
            style={{ letterSpacing: "1px" }}
            icon={<GoogleOutlined />}
            size="large"
          >
            Google Login
          </Button>
          <Link
            to="/forgot/password"
            className="float-right text-danger font-weight-bold"
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
