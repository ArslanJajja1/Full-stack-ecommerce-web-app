import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  name: "",
  images: [],
};
const CategoryUpdate = () => {
  const [values, setValues] = useState(initialState);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const slug = param.slug;
  useEffect(() => {
    loadCategory();
  }, []);
  const loadCategory = () => {
    getCategory(slug).then((res) => {
      setName(res.data.name);
      setValues({ ...values, ...res.data.category });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setValues({ name: "", images: [] });
        toast.success(`${res.data.name} updated`);
        navigate("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
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
              style={{
                letterSpacing: "3px",
                borderBottom: "5px solid #4db5ff",
                width: "fit-content",
              }}
              className="text-white font-weight-bold text-center mx-auto my-4 pb-2"
            >
              Create Update
            </h4>
          )}
          <div className="text-white font-weight-bold productCard-container shadow-lg bg-body py-2 px-3">
            <CategoryForm
              values={values}
              setValues={setValues}
              setImageLoading={setImageLoading}
              handleSubmit={handleSubmit}
              loading={loading}
              handleChange={handleChange}
            />
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
