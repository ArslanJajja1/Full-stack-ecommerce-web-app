import axios from 'axios';
const REACT_APP_API = 'https://ecommy.herokuapp.com/api'

export const getOrders = async (authtoken) =>
  await axios.get(`${REACT_APP_API}/admin/orders`, { headers: { authtoken } });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(`${REACT_APP_API}/admin/order-status`, { orderId, orderStatus }, { headers: { authtoken } });
