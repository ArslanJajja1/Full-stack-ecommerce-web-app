import axios from "axios";

export const createProduct = async (product, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: { authtoken },
    });
};

export const getProductsByCount = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

export const removeProduct = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: { authtoken },
    });
};
export const getProduct = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};
