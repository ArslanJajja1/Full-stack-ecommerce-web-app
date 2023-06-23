import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../functions/stripe';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.jpg';
import { createOrder, emptyUserCart } from '../../functions/user';
const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const { user, coupon } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(coupon, user.token).then((res) => {
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          if (typeof window !== 'undefined') localStorage.removeItem('cart');
          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          });
          dispatch({
            type: 'COUPON_APPLIED',
            payload: false,
          });
          emptyUserCart(user.token);
        }
      });
      setError(null);
      setSucceeded(true);
      setProcessing(false);
    }
  };

  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  const cardStyle = {
    style: {
      width: '100%',
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  return (
    <div className="p-4 shadow-lg bg-body productCard-container" style={{ backgroundColor: '#2c2c6c' }}>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert bg-white text-success font-weight-bold">{`Coupon applied. Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert bg-white text-danger font-weight-bold">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center">
        <p className="alert bg-white text-info font-weight-bold d-flex justify-content-between align-items-center">
          <span>
            <DollarOutlined className=" pr-2" />
            Total : ${cartTotal}
          </span>
          <span>|</span>
          <span>
            <CheckOutlined className=" pr-2" />
            Payable : ${(payable / 100).toFixed(2)}
          </span>
        </p>
      </div>
      <form id="payment-form " style={{ minWidth: 'max-content', maxWidth: '100%' }} className="" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button className="stripe-button" disabled={processing || disabled || succeeded}>
          <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : 'Pay'}</span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            <p className="text-danger bg-white">{error}</p>
          </div>
        )}
        <p className={succeeded ? 'result-message text-white' : 'result-message hidden'}>
          Payment Successfull.{' '}
          <Link to="/user/history" className="font-weight-bold text-white text-decoration-underline">
            View order
          </Link>
        </p>
      </form>
    </div>
  );
};

export default StripeCheckout;
