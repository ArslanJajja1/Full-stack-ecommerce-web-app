import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
    const { search } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { text } = search;
    const handleChange = (e) => {
        dispatch({ type: "SEARCH_QUERY", payload: { text: e.target.value } });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/shop?${text}`);
    };
    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
                type="search"
                value={text}
                onChange={handleChange}
                className="form-control mr-sm-2"
                placeholder="Search"
            />
            <SearchOutlined
                onClick={handleSubmit}
                style={{ cursor: "pointer" }}
            />
        </form>
    );
};

export default Search;
