import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
const initialState = {
    title: "",
    description: "",
    price: "",
    categories: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
};
const ProductCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const loadCategories = () => {
        getCategories().then((c) =>
            setValues({ ...values, categories: c.data })
        );
    };
    useEffect(() => {
        loadCategories();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createProduct(values, user.token)
            .then((res) => {
                console.log("Product res...", res);
                setLoading(false);
                window.location.reload();
                toast.success(`Product created successfully`);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.error);
                setLoading(false);
            });
    };
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("Category clicked ... ", e.target.value);
        setValues({ ...values, cateory: e.target.value });
        getCategorySubs(e.target.value)
            .then((res) => {
                setSubOptions(res.data);
                console.log("getCategorySubs response...", res);
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Product Create</h4>
                    <hr />
                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        loading={loading}
                        handleCategoryChange={handleCategoryChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
