import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";
import SingleProduct from "../components/cards/SingleProduct";
import { getProduct, productStar, getRelated } from "../functions/product";

const Product = () => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const param = useParams();
  const slug = param.slug;
  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token)
      .then((res) => {})
      .catch((error) => {});
  };
  const loadSingleProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
        // load related products
        getRelated(res.data._id).then((res) => setRelated(res.data));
      })
      .catch((err) => {});
  };
  useEffect(() => {
    loadSingleProduct();
  }, [slug]);
  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, []);
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4
            style={{
              letterSpacing: "3px",
              borderBottom: "5px solid #4db5ff",
              width: "fit-content",
            }}
            className="text-white font-weight-bold text-center mx-auto"
          >
            Related Products
          </h4>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div
              key={r._id}
              className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center align-items-center"
            >
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col text-white">
            No Related Products Available
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
