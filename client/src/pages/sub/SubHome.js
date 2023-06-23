import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import { getSubCategory } from "../../functions/subCategory";

const CategoryHome = () => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getSubCategory(slug).then((res) => {
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);
  return (
    <div className="container ">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <>
              <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                {products.length} Products in "{sub.name}" Sub Category
              </h4>
            </>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
