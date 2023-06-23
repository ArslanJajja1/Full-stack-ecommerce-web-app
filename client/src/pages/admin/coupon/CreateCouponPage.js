import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getCoupons, removeCoupon, createCoupon } from '../../../functions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, discount, expiry }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        loadAllCoupons();
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Error! Try Again.');
      });
  };
  const handleRemove = (couponId) => {
    setLoading(true);
    if (window.confirm('Delete?')) {
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons();
          setLoading(false);
          toast.error(`${res.data.name} coupon removed`);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };
  const loadAllCoupons = () => {
    getCoupons().then((res) => {
      setCoupons(res.data);
    });
  };
  useEffect(() => {
    loadAllCoupons();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminNav />
        </div>
        <div className="col-md-11">
          {loading ? (
            <h4 className="text-white">Loading...</h4>
          ) : (
            <h4
              style={{ letterSpacing: '3px', borderBottom: '5px solid #4db5ff', width: 'fit-content' }}
              className="text-white font-weight-bold text-center mx-auto my-4 pb-2"
            >
              Coupon
            </h4>
          )}
          <div className="text-white font-weight-bold productCard-container shadow-lg bg-body py-2 px-3 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-white">Name</label>
                <input
                  type="text"
                  className="form-control text-white"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoFocus
                  required
                  placeholder="Enter Coupon Name"
                />
              </div>
              <div className="form-group">
                <label className="text-white">Discount %</label>
                <input
                  type="text"
                  className="form-control text-white"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  required
                  placeholder="Enter Discount %"
                />
              </div>
              <div className="form-group">
                <label className="text-white">Expiry</label>
                <DatePicker
                  className="form-control text-white"
                  selected={expiry}
                  value={expiry}
                  required
                  onChange={(date) => setExpiry(date)}
                  placeholder="Click to Add Expiry Date"
                />
              </div>
              <button
                style={{ color: '#2c2c6c', letterSpacing: '1px' }}
                className="btn mt-2 bg-white font-weight-bold btn-raised"
              >
                Save
              </button>
            </form>
            <br />
            <h4 className="text-white">{coupons.length} Coupons</h4>
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Expiry</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#2c2c6c' }}>
                  {coupons.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{new Date(c.expiry).toLocaleDateString()}</td>
                      <td>{c.discount}%</td>
                      <td>
                        <DeleteOutlined onClick={(e) => handleRemove(c._id)} className="text-danger pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
