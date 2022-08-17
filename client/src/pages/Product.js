import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { getProduct } from "../functions/product";

const Product = () => {
    const [product, setProduct] = useState({});
    const param = useParams();
    const slug = param.slug;
    const loadSingleProduct = () => {
        getProduct(slug)
            .then((res) => {
                console.log("Product response ", res);
                setProduct(res.data);
            })
            .catch((err) => console.log("Err", err));
    };
    useEffect(() => {
        loadSingleProduct();
    }, [slug]);
    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct product={product} />
            </div>
            <div className="row">Show Related Products</div>
        </div>
    );
};

export default Product;
