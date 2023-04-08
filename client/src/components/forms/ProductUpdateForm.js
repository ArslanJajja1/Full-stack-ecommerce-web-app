import React from "react";
import { Select } from "antd";
const { Option } = Select;
const ProductUpdateForm = ({
    handleChange,
    handleSubmit,
    values,
    setValues,
    handleCategoryChange,
    categories,
    subOptions,
    arrayOfSubs,
    setArrayOfSubs,
    selectedCategory,
    loading,
}) => {
    const {
        title,
        description,
        price,
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
        <form onSubmit={handleSubmit} className="text-white font-weight-bold productCard-container shadow-lg bg-body py-2 px-3">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control text-white"
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
                    className="form-control text-white"
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
                    className="form-control text-white"
                    value={price}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="shipping">Shipping</label>
                <select
                    name="shipping"
                    id="shipping"
                    className="form-control text-white"
                    style={{ backgroundColor: '#2c2c6c' }} 
                    value={shipping}
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
                    className="form-control text-white"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="color">Color</label>
                <select
                    name="color"
                    id="color"
                    className="form-control text-white"
                    style={{ backgroundColor: '#2c2c6c' }} 
                    value={color}
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
                    className="form-control text-white"
                    style={{ backgroundColor: '#2c2c6c' }} 
                    value={brand}
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
                    className="form-control text-white"
                    style={{ backgroundColor: '#2c2c6c' }} 
                    value={selectedCategory ? selectedCategory : category._id}
                    onChange={handleCategoryChange}
                >
                    {categories.length > 0 &&
                        categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label htmlFor="subs">Sub Category</label>
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    // value={subs}
                    value={arrayOfSubs}
                    onChange={(value) => setArrayOfSubs(value)}
                >
                    {subOptions.length &&
                        subOptions.map((s) => (
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>
                        ))}
                </Select>
            </div>

            <br />
            <button className="btn btn-outline-info">
                {loading ? "Loading..." : "Save"}
            </button>
        </form>
    );
};

export default ProductUpdateForm;
