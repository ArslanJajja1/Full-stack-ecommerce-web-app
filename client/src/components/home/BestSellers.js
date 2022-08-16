import React, { useEffect, useState } from "react";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";
import { getProducts } from "../../functions/product";

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadAllProducts();
    }, []);
    const loadAllProducts = () => {
        setLoading(true);
        getProducts("sold", "desc", 6)
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
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4 mb-3">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default BestSellers;
