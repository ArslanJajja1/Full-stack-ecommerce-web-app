import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadUserOrders();
  }, []);
  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {      setOrders(res.data);
    });
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p?.product?.title}</b>
            </td>
            <td>{p?.product?.price}</td>
            <td>{p?.product?.brand}</td>
            <td>{p?.product?.color}</td>
            <td>{p?.count}</td>
            <td>
              {p?.product?.shipping === 'Yes' ? (
                <CheckCircleOutlined
                  ref={(el) => {
                    if (el) {
                      el.style.setProperty('color', '#2c2c6c', 'important');
                    }
                  }}
                />
              ) : (
                <CloseCircleOutlined
                  ref={(el) => {
                    if (el) {
                      el.style.setProperty('color', 'red', 'important');
                    }
                  }}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const showDownLoadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      className="btn btn-sm btn-block btn-outline-primary"
      fileName="invoice.pdf"
    >
      Download PDF
    </PDFDownloadLink>
  );
  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="mb-2 p-3 card" style={{ overflowX: 'auto' }}>
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownLoadLink(order)}</div>
        </div>
      </div>
    ));
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <UserNav />
        </div>
        <div className="col-md-11 text-center">
          <h4
            className="text-white  font-weight-bold font-italic mx-auto my-4"
            style={{ letterSpacing: '3px', borderBottom: '5px solid #4db5ff', width: 'fit-content' }}
          >
            {orders.length > 0 ? 'User orders' : 'No orders'}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
