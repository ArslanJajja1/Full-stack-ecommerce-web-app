import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon } from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState('');
  const [discountError, setDiscountError] = useState(0);
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
      setTotalAfterDiscount(0);
      setCoupon('');
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
  const applyDiscountCoupon = () => {
    console.log('send coupon to server ', coupon);
    applyCoupon(coupon, user.token)
      .then((res) => {
        if (res.data) {
          setTotalAfterDiscount(res.data);
        }
        if (res.data.err) {
          setDiscountError(res.data.err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary btn-raised mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );
  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count}
        </p>
      </div>
    ));
  };
  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        placeholder="Enter Coupon"
        className="form-control"
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError('');
        }}
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary btn-raised mt-2">
        Apply
      </button>
    </>
  );
  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <hr />
          {showAddress()}
          <hr />
          <h4>Got Coupon ? </h4>
          <hr />
          {showApplyCoupon()}
          <br />
          {discountError && <p className="text-danger p-2">{discountError}</p>}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products {products.length}</p>
          <hr />
          {showProductSummary()}
          <hr />
          <p>Cart Total : ${total}</p>
          {totalAfterDiscount > 0 && (
            <div>
              <p className="bg-success p-2">Discount Applied! Total Payable : ${totalAfterDiscount}</p>
            </div>
          )}
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
