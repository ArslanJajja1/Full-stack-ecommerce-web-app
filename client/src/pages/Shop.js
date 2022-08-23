import React, { useState, useEffect } from "react";
import {
    getProductsByCount,
    fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;
    //1. Load products by default on page load;
    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };
    useEffect(() => {
        loadAllProducts();
    }, []);
    //2. Load product on search input change
    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        });
    };
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300);
        return clearTimeout(delayed);
    }, [text]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">sidebar</div>
                <div className="col-md-9">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="text-danger">Products</h4>
                    )}
                    {products.length < 1 && <p>No products Found</p>}
                    <div className="row pb-5">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 mt-3">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
