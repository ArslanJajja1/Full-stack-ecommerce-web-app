import axios from "axios";
const REACT_APP_API = process.env.REACT_APP_API;

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    `${REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return axios.post(
    `${REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const currentAdmin = async (authToken) => {
  return axios.post(
    `${REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
