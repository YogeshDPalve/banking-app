// trim data

import axios from "axios";

export const trimData = (obj) => {
  let finalObj = {};
  for (let key in obj) {
    finalObj[key] = obj[key]?.trim().toLowerCase();
  }
  return finalObj;
};

export const http = (accessToken = null) => {
  axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  return axios;
};
