import React from "react";

const CategoryForm = ({ name, setName, handleSubmit, loading }) => (
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
);

export default CategoryForm;
