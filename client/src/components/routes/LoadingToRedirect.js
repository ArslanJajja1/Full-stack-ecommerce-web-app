import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [navigate, count]);
  return (
    <div className="container p-5 text-center">
      <p className="text-white">Redirecting you in {count} seconds</p>
    </div>
  );
};
export default LoadingToRedirect;
