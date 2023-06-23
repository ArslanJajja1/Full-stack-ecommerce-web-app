import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  number: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipcode: "",
};
const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(initialState);
  const [addressSaved, setAddressSaved] = useState(false);
  const [couponForCheckout, setCouponForCheckout] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const { user, COD, coupon } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddressChanged = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCouponForCheckout("");
      toast.success("Cart is empty");
    });
  };
  const saveAddressToDb = (e) => {
    e.preventDefault();
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddress(initialState);
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };
  const applyDiscountCoupon = () => {
    applyCoupon(couponForCheckout, user.token)
      .then((res) => {
        if (res.data) {
          setTotalAfterDiscount(res.data);
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
        }
        if (res.data.err) {
          setDiscountError(res.data.err);
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
        }
      })
      .catch((error) => {});
  };
  const showAddress = () => (
    <div
      className="text-white p-4 shadow-lg bg-body productCard-container"
      style={{
        backgroundColor: "#2c2c6c",
        minWidth: "max-content",
        height: "max-content",
      }}
    >
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label className="font-weight-bold" for="inputName4">
              Full Name
            </label>
            <input
              value={address.name}
              onChange={handleAddressChanged}
              name="name"
              type="text"
              class="form-control text-white"
              id="inputName4"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div class="form-group col-md-4">
            <label className="font-weight-bold" for="inputEmail4">
              Email
            </label>
            <input
              value={address.email}
              onChange={handleAddressChanged}
              name="email"
              type="email"
              class="form-control text-white"
              id="inputEmail4"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div class="form-group col-md-4">
            <label className="font-weight-bold" for="inputNumber4">
              Phone Number
            </label>
            <input
              value={address.number}
              onChange={handleAddressChanged}
              name="number"
              type="number"
              class="form-control text-white"
              id="inputNumber4"
              placeholder="Enter Phone Number"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label className="font-weight-bold" for="inputAddress">
            Address 1
          </label>
          <input
            value={address.address1}
            onChange={handleAddressChanged}
            name="address1"
            type="text"
            class="form-control text-white"
            id="inputAddress"
            placeholder="1234 Main St"
            required
          />
        </div>
        <div class="form-group">
          <label className="font-weight-bold" for="inputAddress2">
            Address 2
          </label>
          <input
            value={address.address2}
            onChange={handleAddressChanged}
            name="address2"
            type="text"
            class="form-control text-white"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            required
          />
        </div>
        <div class="form-row d-flex justify-content-center align-items-center">
          <div class="form-group col-md-6">
            <label className="font-weight-bold" for="inputState">
              State
            </label>
            <select
              value={address.state}
              onChange={handleAddressChanged}
              name="state"
              id="inputState"
              class="form-control text-white"
              style={{ backgroundColor: "#2c2c6c" }}
              required
            >
              <option selected>Choose...</option>
              <option value="Punjab">Punjab</option>
              <option value="KPK">KPK</option>
              <option value="Sindh">Sindh</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Gilgit">Gilgit</option>
              <option value="Islamabad">Islamabad</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label className="font-weight-bold" for="inputCity">
              City
            </label>
            <input
              value={address.city}
              onChange={handleAddressChanged}
              name="city"
              type="text"
              class="form-control text-white"
              id="inputCity"
              placeholder="Your city"
              required
            />
          </div>
          <div class="form-group col-md-2">
            <label className="font-weight-bold" for="inputZip">
              Zipcode
            </label>
            <input
              value={address.zipcode}
              onChange={handleAddressChanged}
              name="zipcode"
              type="number"
              class="form-control text-white"
              id="inputZip"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={saveAddressToDb}
          style={{ color: "#2c2c6c", letterSpacing: "1px" }}
          className="btn mt-3 bg-white font-weight-bold btn-raised"
          disabled={
            !address.name ||
            !address.email ||
            !address.number ||
            !address.address1 ||
            !address.address2 ||
            !address.state ||
            !address.city ||
            !address.zipcode
          }
        >
          Submit
        </button>
      </form>
      {/* <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary btn-raised mt-2" onClick={saveAddressToDb}>
        Save
      </button> */}
    </div>
  );
  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i}>
        <p>
          <span className="font-weight-bold" style={{ letterSpacing: "1px" }}>
            {p.product.title} ({p.color}) x {p.count}
          </span>{" "}
          = <span>{p.product.price * p.count}</span>
        </p>
      </div>
    ));
  };
  const showApplyCoupon = () => (
    <div
      className="text-white p-4 shadow-lg bg-body productCard-container"
      style={{ backgroundColor: "#2c2c6c" }}
    >
      <input
        type="text"
        placeholder="Enter Coupon"
        className="form-control text-white"
        onChange={(e) => {
          setCouponForCheckout(e.target.value);
          setDiscountError("");
        }}
      />
      <span
        onClick={applyDiscountCoupon}
        style={{ color: "#2c2c6c", letterSpacing: "1px" }}
        className="btn mt-3 bg-white font-weight-bold btn-raised"
      >
        Apply
      </span>
    </div>
  );
  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, coupon).then((res) => {
      console.log("Create cash order response ", res);
      // empty cart from redux,local storage,reset coupon,reset COD,redirect to user history
      if (res.data.ok) {
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        dispatch({ type: "ADD_TO_CART", payload: [] });
        dispatch({ type: "COUPON_APPLIED", payload: false });
        dispatch({ type: "COD", payload: false });
        emptyUserCart(user.token);
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
    });
  };
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h4
            className="text-white font-weight-bold pb-1"
            style={{
              letterSpacing: "3px",
              borderBottom: "5px solid #4db5ff",
              width: "fit-content",
            }}
          >
            Delivery Address
          </h4>
          <hr />
          {showAddress()}
          <hr />
          <div>
            <h4
              className="text-white font-weight-bold pb-1"
              style={{
                letterSpacing: "3px",
                borderBottom: "5px solid #4db5ff",
                width: "fit-content",
              }}
            >
              Got Coupon ?{" "}
            </h4>
            <hr />
            {showApplyCoupon()}
          </div>
          <br />
          {discountError && (
            <h6 className="bg-danger text-white text-center p-2">
              {discountError}
            </h6>
          )}
        </div>

        <div
          className="col-lg-4 text-white mx-auto p-4 text-center shadow-lg bg-body productCard-container"
          style={{
            backgroundColor: "#2c2c6c",
            marginTop: "3.8rem",
            minWidth: "max-content",
            maxWidth: "20rem",
            height: "max-content",
          }}
        >
          <h4
            className="text-white  font-weight-bold font-italic mx-auto mb-4 pb-1"
            style={{
              letterSpacing: "3px",
              borderBottom: "5px solid #4db5ff",
              width: "fit-content",
            }}
          >
            Order Summary
          </h4>
          <h6
            className="text-white font-weight-bold"
            style={{ letterSpacing: "3px" }}
          >
            Products {products.length}
          </h6>
          {showProductSummary()}
          <hr />
          <p>
            <span className="font-weight-bold" style={{ letterSpacing: "2px" }}>
              Cart Total :
            </span>{" "}
            <span style={{ letterSpacing: "2px" }}>${total}</span>
          </p>
          {totalAfterDiscount > 0 && (
            <div>
              <h6
                className="bg-white p-2 font-weight-bold"
                style={{ color: "#2c2c6c" }}
              >
                Discount Applied! Payable : ${totalAfterDiscount}
              </h6>
            </div>
          )}

          <div
            style={{ maxWidth: "20rem", minWidth: "12rem" }}
            className="mx-auto"
          >
            {COD ? (
              <button
                onClick={createCashOrder}
                disabled={!addressSaved || !products.length}
                style={{ color: "#2c2c6c", letterSpacing: "1px" }}
                className="btn mt-2 bg-white font-weight-bold btn-raised w-100"
              >
                Place Order
              </button>
            ) : (
              <button
                onClick={() => navigate("/payment")}
                disabled={!addressSaved || !products.length}
                style={{ color: "#2c2c6c", letterSpacing: "1px" }}
                className="btn mt-2 bg-white font-weight-bold btn-raised w-100"
              >
                Place Order
              </button>
            )}

            <button
              disabled={!products.length}
              onClick={emptyCart}
              style={{ color: "#2c2c6c", letterSpacing: "1px" }}
              className="btn mt-2 bg-white font-weight-bold btn-raised w-100"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
