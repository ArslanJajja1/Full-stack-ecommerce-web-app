import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    createCategory,
    getCategories,
    removeCategory,
} from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
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
    }, []);
    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`${res.data.category.name} created`);
                loadCategories();
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
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    console.log(res);
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
                    <h4>Create Category</h4>
                    <CategoryForm
                        name={name}
                        setName={setName}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    {categories
                        .filter(searchedCategories(keyword))
                        .map((category) => (
                            <div
                                key={category._id}
                                className="alert alert-secondary"
                            >
                                {category.name}
                                <span
                                    onClick={(e) => handleRemove(category.slug)}
                                    className="btn btn-sm float-right"
                                >
                                    <DeleteOutlined className="text-danger" />
                                </span>

                                <Link to={`/admin/category/${category.slug}`}>
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

export default CategoryCreate;
