import React from 'react';
import { useDispatch } from 'react-redux';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.jpg';
const ProductCardInCheckout = ({ product }) => {
  console.log('product ', product);
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
    console.log('cart updated');
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart,
    });
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto' }}>
            {product.images.length ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
              />
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
            className="form-control"
            onChange={handleColorChange}
            name="color"
          >
            {product.color ? (
              <option value={product.color}>{product.color}</option>
            ) : (
              'select'
            )}
            {colors
              .filter((c) => c !== product.color)
              .map((c) => (
                <option key={`${c}#`} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td>{product.count}</td>
        <td>Shipping Icon</td>
        <td>Delete Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
