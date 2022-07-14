import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signInWithEmailLink,updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
        toast.error('Email and password are required')
        return
    }
    if(password.length<6) {
        toast.error('Password must be atleast 6 chars')
        return
    }
    try {
    const result  = await signInWithEmailLink(auth,email,window.location.href)
    console.log('Result',result)
    if(result.user.emailVerified){
        window.localStorage.removeItem('emailForRegistration')
        let user = auth.currentUser
        await updatePassword(user,password)
        const idTokenResult = await user.getIdTokenResult()
        console.log('user',user,'id',idTokenResult)
        navigate('/')
    }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  };
  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        disabled
      />
      <input
        type="password"
        className="form-control mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
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
          <h4>Complete Registeration</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
