import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
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

const ProductUpdate = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
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
      .catch((err) => {});
  };
  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch((error) => {});
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    updateProduct(param.slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} updated sucessfully`);
        navigate("/admin/products");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setLoading(false);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
              Product Update
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
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
