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
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import laptopAvatar from "../../../assets/images/laptop-avatar.jpg";

const initialState = {
  name: "",
  images: [],
};
const CategoryCreate = () => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory(values, user.token)
      .then((res) => {
        setLoading(false);
        setValues({ name: "", images: [] });
        toast.success(`${res.data.category.name} created`);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleRemove = (slug) => {
    if (window.confirm("Delete ? ")) {
      // setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.deleted.name} deleted`);
          loadCategories();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            // setLoading(false);
            toast.error(error.response.data);
          }
        });
    }
  };

  // One way to filter => const searchedCategories = (keyword) => {

  const searchedCategories = (keyword) => {
    return (c) => {
      return c.name.toLowerCase().includes(keyword);
    };
  };
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-1">
          <AdminNav />
        </div>
        <div className="col-md-11 ">
          {imageLoading ? (
            <LoadingOutlined className="text-danger h1 mx-auto" />
          ) : (
            <h4
              style={{
                letterSpacing: "3px",
                borderBottom: "5px solid #4db5ff",
                width: "fit-content",
              }}
              className="text-white font-weight-bold text-center mx-auto my-4 pb-2"
            >
              Create Category
            </h4>
          )}
          <div className="text-white font-weight-bold productCard-container shadow-lg bg-body py-2 px-3">
            <CategoryForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              setImageLoading={setImageLoading}
            />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            {categories.filter(searchedCategories(keyword)).map((category) => (
              <div key={category._id} className="alert alert-secondary">
                {category.images.length > 0 ? (
                  <img
                    src={category.images[0].url}
                    alt=""
                    className="mr-2"
                    style={{
                      width: "50px",
                      height: "auto",
                      border: "2px solid #2c2c6c",
                    }}
                  />
                ) : (
                  <img
                    src={laptopAvatar}
                    alt=""
                    className="mr-2"
                    style={{
                      width: "50px",
                      height: "auto",
                      border: "2px solid #2c2c6c",
                    }}
                  />
                )}
                {category.name}
                <span
                  onClick={(e) => handleRemove(category.slug)}
                  className="btn btn-sm float-right "
                >
                  <DeleteOutlined
                    ref={(el) => {
                      if (el) {
                        el.style.setProperty("color", "red", "important");
                      }
                    }}
                  />
                </span>

                <Link to={`/admin/category/${category.slug}`}>
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

export default CategoryCreate;
