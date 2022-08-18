import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { getProduct, productStar } from "../functions/product";

const Product = () => {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const { user } = useSelector((state) => ({ ...state }));
    const param = useParams();
    const slug = param.slug;
    const onStarClick = (newRating, name) => {
        setStar(newRating);
        console.log("Name", name, typeof name);
        productStar(name, newRating, user.token)
            .then((res) => {
                console.log("res. ", res);
            })
            .catch((error) => console.log(error));
    };
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
                    <h4>Related Products</h4>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default Product;
