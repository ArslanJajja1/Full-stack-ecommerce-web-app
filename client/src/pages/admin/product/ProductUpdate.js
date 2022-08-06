import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
    title: "",
    description: "",
    price: "",
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

const ProductUpdate = (props) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const param = useParams();
    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);
    const loadProduct = () => {
        getProduct(param.slug)
            .then((p) => {
                setValues({ ...values, ...p.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data));
    };
    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("Category clicked ... ", e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
            .then((res) => {
                setSubOptions(res.data);
                console.log("getCategorySubs response...", res);
            })
            .catch((error) => console.log(error));
    };
    const handleSubmit = (e) => {};
    const handleChange = (e) => {};
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Product Update</h4>
                    <hr />
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
