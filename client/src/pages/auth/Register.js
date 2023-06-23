import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const REACT_APP_REGISTER_REDIRECT_URL =
  process.env.REACT_APP_REGISTER_REDIRECT_URL;

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
      url: REACT_APP_REGISTER_REDIRECT_URL,
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
        className="form-control text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Enter Email"
      />
      <button
        type="submit"
        style={{ color: "#2c2c6c", letterSpacing: "1px" }}
        className="btn mt-4 bg-white font-weight-bold btn-raised"
      >
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div
          className="container col-md-6 offset-md-3 text-white mx-auto p-4 text-center shadow-lg bg-body productCard-container"
          style={{ backgroundColor: "#2c2c6c", marginTop: "3.2rem" }}
        >
          <h4
            style={{
              letterSpacing: "3px",
              borderBottom: "5px solid #4db5ff",
              width: "fit-content",
            }}
            className="text-white font-weight-bold text-center pb-2 mx-auto mb-4"
          >
            Register
          </h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
