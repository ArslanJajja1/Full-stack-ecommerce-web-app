import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    updateSubCategory,
    getSubCategory,
} from "../../../functions/subCategory";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCategoryUpdate = () => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const param = useParams();
    const navigate = useNavigate();
    //Another way to filter categories
    // const filterCategories = categories.filter((item) => {
    //     if (keyword === "") {
    //         return item;
    //     } else {
    //         return item.name.toLowerCase().includes(keyword);
    //     }
    // });
    useEffect(() => {
        loadCategories();
        loadSubCategory();
    }, []);
    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
    };
    const loadSubCategory = () => {
        getSubCategory(param.slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSubCategory(param.slug, { name, parent }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                console.log("res===>", res);
                toast.success(`${res.data.name} updated`);
                navigate("/admin/subcategory");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Update Sub Category</h4>
                    <div className="form-group">
                        <label htmlFor="category">Parent Category</label>
                        <select
                            name="category"
                            id="category"
                            className="form-control"
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option>Please select</option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option
                                        key={c._id}
                                        value={c._id}
                                        selected={c._id === parent}
                                    >
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <CategoryForm
                        name={name}
                        setName={setName}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default SubCategoryUpdate;
