import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) {
          navigate("/checkout");
        }
      })
      .catch((err) => {});
  };
  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) {
          navigate("/checkout");
        }
      })
      .catch((err) => {});
  };
  const showCartItems = () => {
    return (
      <div
        style={{ overflowX: "auto", backgroundColor: "#2c2c6c" }}
        className="shadow-lg bg-body productCard-container"
      >
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Brand</th>
              <th scope="col">Color</th>
              <th scope="col">Count</th>
              <th scope="col">Shipping</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          {cart.map((p) => (
            <ProductCardInCheckout key={p._id} product={p} />
          ))}
        </table>
      </div>
    );
  };
  return (
    <div className="container-fluid py-3">
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <h4
            className="text-white mb-4"
            style={{
              letterSpacing: "3px",
              borderBottom: "5px solid #4db5ff",
              width: "fit-content",
            }}
          >
            Cart / {cart.length}
          </h4>
          {!cart.length ? (
            <p className="text-white">
              No products in cart. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>

        <div
          className="col-lg-3 col-md-12 text-white mx-auto p-4 text-center shadow-lg bg-body productCard-container"
          style={{
            backgroundColor: "#2c2c6c",
            marginTop: "3.2rem",
            minWidth: "max-content",
            maxWidth: "70%",
          }}
        >
          <h4
            className="text-white  font-weight-bold font-italic mx-auto mb-4"
            style={{
              letterSpacing: "3px",
              borderBottom: "5px solid #4db5ff",
              width: "fit-content",
            }}
          >
            Order
          </h4>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                <span
                  className="font-weight-bold"
                  style={{ letterSpacing: "2px" }}
                >
                  {c.title} x {c.count}
                </span>{" "}
                = <span>${c.price * c.count}</span>
              </p>
            </div>
          ))}
          <hr />
          <p>
            <span className="font-weight-bold" style={{ letterSpacing: "2px" }}>
              Total
            </span>{" "}
            : <b>${getTotal()}</b>
          </p>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                disabled={!cart.length}
                style={{ color: "#2c2c6c", letterSpacing: "1px" }}
                className="btn mt-2 bg-white font-weight-bold btn-raised"
              >
                Proceed to checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                disabled={!cart.length}
                style={{ color: "#2c2c6c", letterSpacing: "1px" }}
                className="btn mt-2 bg-white font-weight-bold btn-raised"
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn mt-2 bg-white font-weight-bold btn-raised">
              <Link
                to="/login"
                style={{ color: "#2c2c6c", letterSpacing: "1px" }}
              >
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
