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
    const [imageLoading, setImageLoading] = useState(false);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const param = useParams();
    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);
    const loadProduct = () => {
        getProduct(param.slug)
            .then((p) => {
                // load single product
                setValues({ ...values, ...p.data });
                // load single product category subs
                getCategorySubs(p.data.category._id).then((res) => {
                    setSubOptions(res.data); // show default subs of product
                });
                // prepare array of sub ids to show as default sub values
                let arr = [];
                p.data.subs.map((s) => {
                    arr.push(s._id);
                });
                setArrayOfSubs((prev) => arr); // required for the ant design select to work
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
        setValues({ ...values, subs: [] });
        setSelectedCategory(e.target.value);
        getCategorySubs(e.target.value)
            .then((res) => {
                setSubOptions(res.data);
                console.log("getCategorySubs response...", res);
            })
            .catch((error) => console.log(error));
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        setArrayOfSubs([]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleChange = (e) => {};
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {imageLoading ? (
                        <LoadingOutlined className="text-danger h1" />
                    ) : (
                        <h4>Product Update</h4>
                    )}
                    <hr />
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setImageLoading={setImageLoading}
                        />
                    </div>
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
