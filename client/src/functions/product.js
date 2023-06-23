import axios from "axios";
const REACT_APP_API = process.env.REACT_APP_API;

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${REACT_APP_API}/product`, product, {
    headers: { authtoken },
  });
};

export const getProductsByCount = async (count) => {
  return await axios.get(`${REACT_APP_API}/products/${count}`);
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${REACT_APP_API}/product/${slug}`, {
    headers: { authtoken },
  });
};
export const getProduct = async (slug) => {
  return await axios.get(`${REACT_APP_API}/product/${slug}`);
};
export const updateProduct = async (slug, product, authtoken) => {
  return await axios.put(`${REACT_APP_API}/product/:${slug}`, product, {
    headers: { authtoken },
  });
};
export const getProducts = async (sort, order, page) => {
  return await axios.post(`${REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });
};
export const getProductsCount = async () => {
  return await axios.get(`${REACT_APP_API}/products/total`);
};

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
export const getRelated = async (productId) => {
  return await axios.get(`${REACT_APP_API}/products/related/${productId}`);
};
export const fetchProductsByFilter = async (arg) => {
  return await axios.post(`${REACT_APP_API}/search/filters`, arg);
};
