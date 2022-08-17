import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        loadSingleProduct();
    }, [slug]);
    return <div>{JSON.stringify(product)}</div>;
};

export default Product;
