import React from "react";

const ProductCreateForm = ({
    handleChange,
    handleSubmit,
    values,
    loading,
    handleCategoryChange,
}) => {
    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
    } = values;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="shipping">Shipping</label>
                <select
                    name="shipping"
                    id="shipping"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="color">Color</label>
                <select
                    name="color"
                    id="color"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option>Please Select</option>
                    {colors.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <select
                    name="brand"
                    id="brand"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option>Please Select</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    className="form-control"
                    onChange={handleCategoryChange}
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
            <button className="btn btn-outline-info">
                {loading ? "Loading..." : "Save"}
            </button>
        </form>
    );
};

export default ProductCreateForm;
