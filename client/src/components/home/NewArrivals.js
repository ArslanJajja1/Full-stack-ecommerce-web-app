import React, { useEffect, useState } from "react";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";
import { getProducts, getProductsCount } from "../../functions/product";
import { Pagination } from "antd";

const NewArrivals = ({ deviceWidth }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts("createdAt", "desc", page)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadAllProducts();
  }, [page]);
  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data);
    });
  }, []);

  return (
    <>
      <div className="px-2 w-100 mx-auto">
        {loading === true ? (
          <LoadingCard count={8} />
        ) : (
          <div
            className="row"
            style={
              deviceWidth > 450 && deviceWidth < 576
                ? { marginLeft: "2rem" }
                : {}
            }
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="col-lg-3 col-md-4 col-sm-6 mb-5 d-flex justify-content-center align-items-center"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            onChange={(page, pageSize) => {
              setPage(page);
            }}
            total={productsCount}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
