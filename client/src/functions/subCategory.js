import axios from "axios";
const REACT_APP_API = process.env.REACT_APP_API;

export const getSubCategories = async () => {
  return await axios.get(`${REACT_APP_API}/subs`);
};

export const getSubCategory = async (slug) => {
  return await axios.get(`${REACT_APP_API}/sub/${slug}`);
};

export const removeSubCategory = async (slug, authtoken) => {
  return await axios.delete(`${REACT_APP_API}/sub/${slug}`, {
    headers: { authtoken },
  });
};

export const updateSubCategory = async (slug, category, authtoken) => {
  return await axios.put(`${REACT_APP_API}/sub/${slug}`, category, {
    headers: { authtoken },
  });
};

export const createSubCategory = async (subCategory, authtoken) => {
  return await axios.post(`${REACT_APP_API}/sub`, subCategory, {
    headers: { authtoken },
  });
};
