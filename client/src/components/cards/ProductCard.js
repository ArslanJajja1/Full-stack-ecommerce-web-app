import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../hooks/useWindowDimensions";
const { Meta } = Card;
const imgStyle = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  objectFit: "cover",
};
const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const { images, title, description, slug, price } = product;
  const dimensions = useWindowDimensions();
  const deviceWidth = dimensions.width;
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      // lodash function to remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  return (
    <>
      <div
        className="productCard-container p-2 shadow-lg bg-body"
        style={{
          minHeight: "430px",
          maxHeight: "430px",
          minWidth: "250px",
          maxWidth: "250px",
          background: "#2c2c6c",
        }}
      >
        <div className="productImage-container">
          <img
            src={images && images.length ? images[0].url : laptop}
            alt={title}
            style={{ height: "200px", ...imgStyle }}
            className="w-100  h-40"
          />
        </div>
        <div className="productContent">
          <h4
            className={`productTitle text-white text-center pt-2 ${
              deviceWidth < 600
            }&& h5`}
          >{`${
            title.length > 25
              ? `${title.substring(0, 25)}...`
              : `${title} - $${price}`
          } `}</h4>
          <p className="productDescription text-white text-center text-wrap">{`${
            description.length > 30
              ? `${description.substring(0, 30)}...`
              : description
          } `}</p>
        </div>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center text-white">No rating yet</div>
        )}
        <div className="pt-2 d-flex flex-column justify-content-center ">
          <Tooltip title={tooltip}>
            <button
              onClick={handleAddToCart}
              disabled={product.quantity < 1}
              style={{ color: "#2c2c6c", letterSpacing: "1px" }}
              className=" btn mt-2 bg-white font-weight-bold btn-raised"
            >
              {product.quantity < 1 ? "Out of stock" : "Add to cart"}
            </button>
          </Tooltip>
          <Link
            to={`/product/${slug}`}
            style={{ color: "#2c2c6c", letterSpacing: "1px" }}
            className=" btn mt-2 bg-white font-weight-bold btn-raised"
          >
            View Product
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
