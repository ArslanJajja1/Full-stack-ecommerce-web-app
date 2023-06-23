import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be atleast 6 chars");
      return;
    }
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await updatePassword(user, password);
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
          })
          .catch((error) => {});
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control text-white bg-transparent"
        value={email}
        disabled
      />
      <input
        type="password"
        className="form-control mt-2 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <button
        type="submit"
        style={{ color: "#2c2c6c", letterSpacing: "1px" }}
        className="btn mt-4 bg-white font-weight-bold btn-raised"
      >
        Submit
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div
          className="col-md-6 offset-md-3 text-white mx-auto p-4 text-center shadow-lg bg-body productCard-container"
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
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
