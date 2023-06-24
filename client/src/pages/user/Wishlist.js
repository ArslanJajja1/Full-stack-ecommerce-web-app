import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import AdminProductCard from "../../components/cards/AdminProductCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadWishlist();
  }, []);
  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4
            className="text-white  font-weight-bold font-italic mx-auto my-4"
            style={{
              letterSpacing: "3px",
              borderBottom: "5px solid #4db5ff",
              width: "fit-content",
            }}
          >
            Wishlist
          </h4>
            <div className="row">
            {wishlist.map((product) => (
            <div
              className="col-lg-6 col-md-6 col-sm-6  mt-3 d-flex justify-content-center align-items-center"
              key={product._id}
            >
              <AdminProductCard
                product={product}
                handleRemove={handleRemove}
                wishlistProduct={true}
              />
            </div>
          ))}
            </div>
          {/* <div key={p._id} className="alert alert-secondary d-flex justify-content-between">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span onClick={(e) => handleRemove(p._id)} className="btn btn-sm">
                <DeleteOutlined className="text-danger" />
              </span>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
