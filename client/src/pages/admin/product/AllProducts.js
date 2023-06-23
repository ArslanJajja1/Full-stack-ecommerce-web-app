import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleRemove = (slug) => {
    if (window.confirm("Delete?")) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminNav />
        </div>
        <div className="col-md-11">
          {loading ? (
            <h4 className="text-white">Loading</h4>
          ) : (
            <h4
              style={{
                letterSpacing: "3px",
                borderBottom: "5px solid #4db5ff",
                width: "fit-content",
              }}
              className="text-white font-weight-bold text-center mx-auto my-4 pb-2"
            >
              All Products
            </h4>
          )}

          <div className="row">
            {products.map((product) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6  mt-3 d-flex justify-content-center align-items-center"
                key={product._id}
              >
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
