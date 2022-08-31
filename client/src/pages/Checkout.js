import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCart, emptyUserCart, saveUserAddress } from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log('User cart response', res);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success('Cart is empty');
    });
  };
  const saveAddressToDb = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Address saved');
      }
    });
  };

  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <hr />
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <button className="btn btn-primary btn-raised mt-2" onClick={saveAddressToDb}>
            Save
          </button>
          <hr />
          <h4>Got Coupon ? </h4>
          <hr />
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
                {p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          <p>Cart Total : ${total}</p>
          <div className="row">
            <div className="col-md-6">
              <button disabled={!addressSaved || !products.length} className="btn btn-primary btn-raised">
                Place Order
              </button>
            </div>
            <div className="col-md-6">
              <button disabled={!products.length} onClick={emptyCart} className="btn btn-primary btn-raised">
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
