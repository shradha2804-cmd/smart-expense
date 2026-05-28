import axios from "axios";

// BASE URL
const BASE_URL =
  import.meta.env
    .VITE_API_URL ||
  "http://localhost:5000/api";

// AXIOS INSTANCE
const API = axios.create({
  baseURL: BASE_URL,
});

// LOGOUT HELPER
const logoutUser =
  () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "isAdmin"
    );

    // PREVENT LOOP
    const currentPath =
      window.location.pathname;

    if (
      currentPath !==
      "/login"
    ) {

      window.location.href =
        "/login";

    }

  };

// ================= REQUEST INTERCEPTOR =================

API.interceptors.request.use(

  (req) => {

    const token =
      localStorage.getItem(
        "token"
      );

    // ADD TOKEN
    if (token) {

      req.headers.Authorization =
        `Bearer ${token}`;

    }

    return req;

  },

  (error) =>
    Promise.reject(error)

);

// ================= RESPONSE INTERCEPTOR =================

API.interceptors.response.use(

  (response) =>
    response,

  (error) => {

    // TOKEN EXPIRED
    if (
      error.response
        ?.status === 401
    ) {

      logoutUser();

    }

    return Promise.reject(
      error
    );

  }

);

export default API;