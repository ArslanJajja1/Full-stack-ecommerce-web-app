import React from 'react';

const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <p>
        <span>
          <p className="badge bg-info text-white"> Order Id </p>:{order.paymentIntent.id}
        </span>
        {' | '}
        <span>
          <p className="badge bg-info text-white"> Amount </p>:
          {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
        {' | '}
        <span>
          <p className="badge bg-info text-white"> Currency </p> :{order.paymentIntent.currency.toUpperCase()}
        </span>
        {' | '}
        <span>
          <p className="badge bg-info text-white"> Method </p> :{order.paymentIntent.payment_method_types[0]}
        </span>
        {' | '}
        <span>
          <p className="badge bg-info text-white"> Payment </p> :{order.paymentIntent.status.toUpperCase()}
        </span>
        {' | '}
        <span>
          <p className="badge bg-info text-white"> Ordered on </p> :
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
        {' | '}
        <span className="badge bg-primary text-white">Status :{order.orderStatus}</span>
        {' | '}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
