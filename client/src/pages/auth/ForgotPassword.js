import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const REACT_APP_FORGOT_PASSWORD_REDIRECT =
  process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT;

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
      url: REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await sendPasswordResetEmail(auth, email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div
      className="container col-md-6 offset-md-3 text-white mx-auto p-4 text-center shadow-lg bg-body productCard-container"
      style={{
        backgroundColor: "#2c2c6c",
        marginTop: "3.2rem",
        minWidth: "max-content",
        maxWidth: "50%",
      }}
    >
      <h4
        style={{
          letterSpacing: "3px",
          borderBottom: "5px solid #4db5ff",
          width: "fit-content",
        }}
        className="text-white font-weight-bold text-center pb-2 mx-auto mb-4"
      >
        Forgot Password
      </h4>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="form-control text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <br />
        <button
          style={{ color: "#2c2c6c", letterSpacing: "1px" }}
          className="btn mt-2 bg-white font-weight-bold btn-raised"
          disabled={!email}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
