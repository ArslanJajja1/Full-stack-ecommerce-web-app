import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { changeStatus, getOrders } from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success('Order status updated');
      loadOrders();
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 ">
          <AdminNav />
        </div>
        <div className="col">Admin dashboard </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
