import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    // ADD TOKEN TO HEADERS
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },

  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,

  (error) => {
    // TOKEN EXPIRED / INVALID
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");

      // OPTIONAL REDIRECT
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;