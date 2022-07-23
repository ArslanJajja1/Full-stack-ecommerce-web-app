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

const CategoryCreate = () => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
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
    const categoryForm = () => (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        required
                    />
                    <br />
                    <button type="submit" className="btn btn-outline-primary">
                        {loading ? "Loading..." : "Save"}
                    </button>
                </div>
            </form>
        </>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Create Category</h4>
                    {categoryForm()}
                    <hr />
                    {categories.map((category) => (
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
