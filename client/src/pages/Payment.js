import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/stripe/StripeCheckout';
import '../css/stripe.css';

const REACT_APP_STRIPE_KEY = pk_test_51L8ZspEkjmpgd6jONqtM1Bx9mTd7w0qRkwRsXkDzSG0flsotPD7Y6pjRATsgey9FGHX0ZackY9qVmWOR3rth6szd00IIZj0hLz
const promise = loadStripe(REACT_APP_STRIPE_KEY);
const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4
        className="text-white font-weight-bold pb-1 mx-auto mb-3"
        style={{ letterSpacing: '3px', borderBottom: '5px solid #4db5ff', width: 'fit-content' }}
      >
        Complete your purchase
      </h4>
      <div className=" shadow-lg bg-body productCard-container mx-auto" style={{ backgroundColor: '#2c2c6c', maxWidth: '25rem' }}>
        <Elements stripe={promise}>
          <div className=" mx-auto">
            <StripeCheckout />
          </div>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
