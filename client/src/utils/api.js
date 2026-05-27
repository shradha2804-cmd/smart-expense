import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api",
});


// REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {

    // USER TOKEN
    const userInfo =
      JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

    // ADMIN TOKEN
    const adminInfo =
      JSON.parse(
        localStorage.getItem(
          "adminInfo"
        )
      );

    // SEND USER TOKEN
    if (userInfo?.token) {

      req.headers.Authorization =
        `Bearer ${userInfo.token}`;

    }

    // SEND ADMIN TOKEN
    if (adminInfo?.token) {

      req.headers.Authorization =
        `Bearer ${adminInfo.token}`;

    }

    return req;

  }
);

export default API;