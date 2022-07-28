import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    createSubCategory,
    getSubCategories,
    removeSubCategory,
} from "../../../functions/subCategory";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCategoryCreate = () => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const { user } = useSelector((state) => ({ ...state }));
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
        createSubCategory({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                console.log("res===>", res);
                toast.success(`${res.data.sub.name} created`);
                loadSubCategories();
            })
            .catch((err) => {
                console.log(err);
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
                    console.log(res);
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

    // One way to filter => const searchedCategories = (keyword) => {

    const searchedCategories = (keyword) => {
        return (c) => {
            console.log("c ", c);
            return c.name.toLowerCase().includes(keyword);
        };
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Create Sub Category</h4>
                    <div className="form-group">
                        <label htmlFor="category">Parent Category</label>
                        <select
                            name="category"
                            id="category"
                            className="form-control"
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
                        name={name}
                        setName={setName}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    {subCategories
                        .filter(searchedCategories(keyword))
                        .map((sub) => (
                            <div
                                key={sub._id}
                                className="alert alert-secondary"
                            >
                                {sub.name}
                                <span
                                    onClick={(e) => handleRemove(sub.slug)}
                                    className="btn btn-sm float-right"
                                >
                                    <DeleteOutlined className="text-danger" />
                                </span>

                                <Link to={`/admin/sub/${sub.slug}`}>
                                    <span className="btn btn-sm float-right">
                                        <EditOutlined className="text-warning" />
                                    </span>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SubCategoryCreate;
