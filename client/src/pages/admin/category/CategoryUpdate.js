import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ match }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const param = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const slug = param.slug;
    useEffect(() => {
        loadCategory();
        console.log("Slug ", slug);
    }, []);
    const loadCategory = () => {
        getCategory(slug).then((res) => {
            setName(res.data.name);
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, { name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} updated`);
                navigate("/admin/category");
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
                    <h4>Update Category</h4>
                    <CategoryForm
                        name={name}
                        setName={setName}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;
