import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory,
} from "../../../functions/subCategory";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import laptopAvatar from "../../../assets/images/laptop-avatar.jpg";

const initialState = {
  name: "",
  images: [],
};
const SubCategoryCreate = () => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);
  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };
  const loadSubCategories = () => {
    getSubCategories().then((res) => setSubCategories(res.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSubCategory({ ...values, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setValues({ name: "", images: [] });
        toast.success(`${res.data.sub.name} created`);
        loadSubCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleRemove = (slug) => {
    if (window.confirm("Delete ? ")) {
      // setLoading(true);
      removeSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.deleted.name} deleted`);
          loadSubCategories();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            // setLoading(false);
            toast.error(error.response.data);
          }
        });
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // One way to filter => const searchedCategories = (keyword) => {

  const searchedCategories = (keyword) => {
    return (c) => {
      return c.name.toLowerCase().includes(keyword);
    };
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
              style={{
                letterSpacing: "3px",
                borderBottom: "5px solid #4db5ff",
                width: "fit-content",
              }}
              className="text-white font-weight-bold text-center mx-auto my-4 pb-2"
            >
              Create Sub Category
            </h4>
          )}
          <div className="text-white font-weight-bold productCard-container shadow-lg bg-body py-2 px-3">
            <div className="form-group">
              <label
                htmlFor="category"
                className="text-white font-weight-bold "
              >
                Parent Category
              </label>
              <select
                name="category"
                id="category"
                className="form-control border-bottom text-white"
                style={{ backgroundColor: "#2c2c6c" }}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Please select</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <CategoryForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              setImageLoading={setImageLoading}
            />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            {subCategories.filter(searchedCategories(keyword)).map((sub) => (
              <div key={sub._id} className="alert alert-secondary">
                {sub.images.length > 0 ? (
                  <img
                    src={sub.images[0].url}
                    alt=""
                    className="mr-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "2px solid #2c2c6c",
                      borderRadius: "100%",
                    }}
                  />
                ) : (
                  <img
                    src={laptopAvatar}
                    alt=""
                    className="mr-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "2px solid #2c2c6c",
                      borderRadius: "100%",
                    }}
                  />
                )}
                {sub.name}
                <span
                  onClick={(e) => handleRemove(sub.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined
                    ref={(el) => {
                      if (el) {
                        el.style.setProperty("color", "red", "important");
                      }
                    }}
                  />
                </span>

                <Link to={`/admin/sub/${sub.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined
                      ref={(el) => {
                        if (el) {
                          el.style.setProperty("color", "#2c2c6c", "important");
                        }
                      }}
                    />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
