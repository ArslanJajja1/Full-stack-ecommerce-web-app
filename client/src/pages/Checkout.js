import React from 'react';

const Checkout = () => {
  const saveAddressToDb = () => {};
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
          <p>Products x</p>
          <hr />
          <p>List of Products</p>
          <hr />
          <p>Cart Total : $x</p>
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary">Place Order</button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
