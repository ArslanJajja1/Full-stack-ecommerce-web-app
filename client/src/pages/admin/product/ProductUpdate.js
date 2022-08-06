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

const ProductUpdate = (props) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState);
    const param = useParams();
    useEffect(() => {
        loadProduct();
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
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
