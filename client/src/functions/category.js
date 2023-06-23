import axios from "axios";
const REACT_APP_API = process.env.REACT_APP_API;

export const getCategories = async () => {
  return await axios.get(`${REACT_APP_API}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`${REACT_APP_API}/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${REACT_APP_API}/category/${slug}`, {
    headers: { authtoken },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(`${REACT_APP_API}/category/${slug}`, category, {
    headers: { authtoken },
  });
};

export const createCategory = async (category, authtoken) => {
  return await axios.post(`${REACT_APP_API}/category`, category, {
    headers: { authtoken },
  });
};

export const getCategorySubs = async (_id) => {
  return await axios.get(`${REACT_APP_API}/categories/subs/${_id}`);
};
