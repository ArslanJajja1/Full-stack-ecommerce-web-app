import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.jpg';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import useWindowDimensions from '../../hooks/useWindowDimensions';
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('Click to add');
  const { images, title, description, slug, price } = product;
  const dimensions = useWindowDimensions();
  const deviceWidth = dimensions.width;
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.push({
        ...product,
        count: 1,
      });
      // lodash function to remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem('cart', JSON.stringify(unique));
      setTooltip('Added');
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };
  return (
    <>
      <div
        className="productCard-container p-2 shadow-lg bg-body"
        style={{
          minHeight: '300px',
          maxHeight: '400px',
          minWidth: '250px',
          maxWidth: '350px',
          background: '#2c2c6c',
        }}
      >
        <div className="productImage-container">
          <img src={images && images.length ? images[0].url : laptop} alt={title} className="w-100  h-50" />
        </div>
        <div className="productContent">
          <h4 className={`productTitle text-white text-center pt-2 ${deviceWidth < 600}&& h5`}>{`${
            title.length > 25 ? `${title.substring(0, 25)}...` : title
          } `}</h4>
          <p className="productDescription text-white text-center text-wrap">{`${
            description.length > 30 ? `${description.substring(0, 30)}...` : description
          } `}</p>
        </div>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center text-white">No rating yet</div>
        )}
        <div className="buttonsContainer d-flex justify-content-around pt-2">
          <Link to={`/product/${slug}`} className="text-white btn text-white btn-raised">
            View
          </Link>
          <Tooltip title={tooltip}>
            <button onClick={handleAddToCart} disabled={product.quantity < 1} className="btn text-white   btn-raised">
              {product.quantity < 1 ? 'Out of stock' : 'Add to cart'}
            </button>
          </Tooltip>
        </div>
      </div>
      {/* {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )} */}
      {/* <Card
        style={{ minHeight: 300, background: '#2c2c6c' }}
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: '200px', objectFit: 'cover' }}
            className="p-1"
            alt=""
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br />
            View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {product.quantity < 1 ? 'Out of stock' : 'Add to cart'}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description.length > 40 ? `${description.substring(0, 40)}...` : description} `}
        />
      </Card> */}
    </>
  );
};

export default ProductCard;
