import React, { useLayoutEffect, useRef } from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
const { Meta } = Card;
const imgStyle = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  objectFit: "cover",
};
const AdminProductCard = ({
  product,
  handleRemove,
  wishlistProduct = false,
}) => {
  const dimensions = useWindowDimensions();
  const deviceWidth = dimensions.width;
  const { title, description, images, slug } = product;
  const updateButtonRef = useRef(null);
  const deleteButtonRef = useRef(null);

  useLayoutEffect(() => {
    updateButtonRef.current.style.setProperty("color", "#2c2c6c", "important");
    deleteButtonRef.current.style.setProperty("color", "#2c2c6c", "important");
  }, []);

  return (
    <>
      <div
        className="productCard-container p-2 shadow-lg bg-body"
        style={{
          minHeight: "450px",
          maxHeight: "450px",
          minWidth: "250px",
          maxWidth: "300px",
          background: "#2c2c6c",
        }}
      >
        <div className="productImage-container">
          <img
            src={images && images.length ? images[0].url : laptop}
            alt={title}
            style={{ height: "250px", ...imgStyle }}
            className="w-100 "
          />
        </div>
        <div className="productContent">
          <h4
            className={`productTitle text-white text-center pt-2 ${
              deviceWidth < 600
            }&& h5`}
          >{`${
            title.length > 25 ? `${title.substring(0, 25)}...` : title
          } `}</h4>
          <p className="productDescription text-white text-center text-wrap">{`${
            description.length > 30
              ? `${description.substring(0, 30)}...`
              : description
          } `}</p>
        </div>
        {/* {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center text-white">No rating yet</div>
        )} */}
        <div className="pt-2 d-flex flex-column justify-content-center ">
          <button
            //   onClick={handleAddToCart}
            disabled={product.quantity < 1}
            style={{ color: "#2c2c6c", letterSpacing: "1px" }}
            className=" btn mt-2 bg-white font-weight-bold btn-raised"
          >
            <Link to={`/admin/product/${slug}`} style={{ color: "#2c2c6c" }}>
              <EditOutlined ref={updateButtonRef} />
              <span className="pl-1">Edit Product</span>
            </Link>
          </button>
          <button
            style={{ color: "#2c2c6c", letterSpacing: "1px" }}
            className=" btn mt-2 bg-white font-weight-bold btn-raised"
            onClick={
              wishlistProduct
                ? () => handleRemove(product._id)
                : () => handleRemove(slug)
            }
          >
            <DeleteOutlined ref={deleteButtonRef} className="text-danger" />{" "}
            <span>Delete Product</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
