import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
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
  colors: [
    "Black",
    "White",
    "Gray",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Pink",
    "Purple",
    "Orange",
    "Brown",
  ],
  brands: ["Levi's", "Zara", "Gucci", "Armani", "Khadi", "Zelbury", "Hermes"],
  color: "",
  brand: "",
};
const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const loadCategories = () => {
    getCategories().then((c) => setValues({ ...values, categories: c.data }));
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createProduct(values, user.token)
      .then((res) => {
        setLoading(false);
        window.location.reload();
        toast.success(`Product created successfully`);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setLoading(false);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch((error) => {});
    setShowSub(true);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminNav />
        </div>
        <div className="col-md-11">
          {imageLoading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4
              className="text-white  font-weight-bold font-italic mx-auto my-4"
              style={{
                letterSpacing: "3px",
                borderBottom: "5px solid #4db5ff",
                width: "fit-content",
              }}
            >
              Product Create
            </h4>
          )}
          <hr />
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setImageLoading={setImageLoading}
            />
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            loading={loading}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
