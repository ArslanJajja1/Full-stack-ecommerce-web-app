import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCart } from '../functions/user';
const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const saveAddressToDb = () => {};
  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log('User cart response', res);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          <br />
          text area
          <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            Save
          </button>
          <hr />
          <h4>Got Coupon ? </h4>
          <br />
          <br />
          coupon input and btn
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products {products.length}</p>
          <hr />
          {products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) x {p.count} ={' '}
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          <p>Cart Total : ${total}</p>
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary btn-raised">
                Place Order
              </button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary btn-raised">Empty Card</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
