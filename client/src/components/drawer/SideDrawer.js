import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const SideDrawer = () => {
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));
  return (
    <Drawer
      width={dimensions.width < 700 ? 300 : 500}
      className="text-center"
      title={`Cart / ${cart.length} Products`}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images && p.images[0] ? (
              <div
                className="d-flex justify-content-between align-items-center mb-2 p-1 text-white shadow-lg bg-body"
                style={{ backgroundColor: "#2c2c6c" }}
              >
                <img
                  src={p.images[0].url}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  alt=""
                />
                <p>
                  {p.title} x {p.count}
                </p>
              </div>
            ) : (
              <div
                className="d-flex justify-content-between align-items-center mb-2 p-1 text-white shadow-lg bg-body"
                style={{ backgroundColor: "#2c2c6c" }}
              >
                <img
                  src={laptop}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                  }}
                  alt=""
                />
                <p>
                  {p.title} x {p.count}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          className="text-center btn text-white btn-raised btn-block"
          onClick={() => dispatch({ type: "SET_VISIBLE", payload: false })}
          style={{ backgroundColor: "#2c2c6c" }}
        >
          Go to cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
