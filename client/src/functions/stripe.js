import axios from 'axios';

export const createPaymentIntent = async (authtoken) => {
  await axios.post(`${process.env.REACT_APP_API}/create-payment-intent`, {}, { headers: { authtoken } });
};
