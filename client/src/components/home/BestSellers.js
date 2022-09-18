import React, { useEffect, useState } from 'react';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';
import { getProducts, getProductsCount } from '../../functions/product';
import { Pagination } from 'antd';

const BestSellers = ({ deviceWidth }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    loadAllProducts();
  }, [page]);
  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data);
    });
  }, []);
  const loadAllProducts = () => {
    setLoading(true);
    getProducts('sold', 'desc', page)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="container">
        {loading === true ? (
          <LoadingCard count={6} />
        ) : (
          <div className="row" style={deviceWidth > 450 && deviceWidth < 576 ? { marginLeft: '2rem' } : {}}>
            {products.map((product) => (
              <div key={product._id} className="col-lg-4 col-md-6 col-sm-6 mb-5">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination current={page} total={productsCount} onChange={(value) => setPage(value)} />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
