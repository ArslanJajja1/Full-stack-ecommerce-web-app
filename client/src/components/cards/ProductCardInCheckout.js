import React from 'react';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.jpg';
const ProductCardInCheckout = ({ product }) => {
  console.log('product ', product);
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
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
        <td>{product.color}</td>
        <td>{product.count}</td>
        <td>Shipping Icon</td>
        <td>Delete Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
