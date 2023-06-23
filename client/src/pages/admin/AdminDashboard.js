import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { changeStatus, getOrders } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

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
      toast.success("Order status updated");
      loadOrders();
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1 ">
          <AdminNav />
        </div>
        <div className="col-md-11">
          <h4
            className="text-white  font-weight-bold font-italic mx-auto my-4"
            style={{
              letterSpacing: "3px",
              borderBottom: "5px solid #4db5ff",
              width: "fit-content",
            }}
          >
            Admin Dashboard
          </h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
