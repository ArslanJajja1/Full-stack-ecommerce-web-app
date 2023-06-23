import React from 'react';
import { useDispatch } from 'react-redux';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.jpg';
import { toast } from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
const ProductCardInCheckout = ({ product }) => {
  const dispatch = useDispatch();
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((p, i) => {
        if (p._id === product._id) {
          cart[i].color = e.target.value;
        }
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart,
    });
  };
  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > product.quantity) {
      toast.error(`Maximum available products : ${product.quantity}`);
      return;
    }
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((p, i) => {
        if (p._id === product._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };
  const handleRemove = () => {
    let cart = [];
    let count;
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((p, i) => {
        if (p._id === product._id) {
          cart.splice(i, 1);
          toast.success('Product removed from cart');
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };
  return (
    <tbody className="text-white">
      <tr>
        <td className="text-center ">
          <div style={{ width: '50px', height: 'auto' }}>
            {product.images && product.images.length ? (
              <ModalImage small={product.images[0].url} large={product.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>{product.brand}</td>
        <td>
          <select
            className="form-control text-white"
            style={{ backgroundColor: '#2c2c6c' }}
            onChange={handleColorChange}
            name="color"
          >
            {product.color ? <option value={product.color}>{product.color}</option> : 'select'}
            {colors
              .filter((c) => c !== product.color)
              .map((c) => (
                <option key={`${c}#`} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center" style={{ width: '50px' }}>
          <input type="number" className="form-control text-white" value={product.count} onChange={handleQuantityChange} />
        </td>
        <td className="text-center">
          {product.shipping === 'Yes' ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined onClick={handleRemove} className="text-danger pointer" />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
