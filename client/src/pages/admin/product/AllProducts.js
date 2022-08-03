import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadAllProducts();
    }, []);
    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                console.log(res);
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? <h4>Loading</h4> : <h4>All Products</h4>}

                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-4 pb-3" key={product._id}>
                                <AdminProductCard product={product} />
                            </div>
                        ))}{" "}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
