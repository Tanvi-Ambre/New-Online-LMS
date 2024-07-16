// import axios from "axios";
// import { getRefreshedToken, isAccessTokenExpired, setAuthUser } from "./auth";
// import { API_BASE_URL } from "./constants";
// import Cookies from "js-cookie";


// const useAxios = () => {
//   const accessToken = Cookies.get("access_token");
//   const refreshToken = Cookies.get("refresh_token");

//   const axiosInstance = axios.create({
//     baseURL: API_BASE_URL,
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   axiosInstance.interceptors.request.use(async (req) => {
//     if (!isAccessTokenExpired) {
//       return req;
//     }

//     const response = await getRefreshedToken(refreshToken);
//     setAuthUser(response.access, response.refresh);
//     req.headers.Authorization = `Bearer ${response.data?.access}`;
//     return req;
//   });

//   return axiosInstance;
// };

// export default useAxios;



//This is working code
import axios from "axios";
import { getRefreshedToken, isAccessTokenExpired, setAuthUser } from "./auth";
import { API_BASE_URL } from "./constants";
import Cookies from "js-cookie";

const getCSRFToken = () => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, 10) === "csrftoken=") {
        cookieValue = decodeURIComponent(cookie.substring(10));
        break;
      }
    }
  }
  return cookieValue;
};

const useAxios = () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  const csrfToken = getCSRFToken();

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!isAccessTokenExpired) {
      return req;
    }

    const response = await getRefreshedToken(refreshToken);
    setAuthUser(response.access, response.refresh);
    req.headers.Authorization = `Bearer ${response.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;



//Experiment

// import axios from "axios";
// import { getRefreshedToken, isAccessTokenExpired, setAuthUser } from "./auth";
// import { API_BASE_URL } from "./constants";
// import Cookies from "js-cookie";

// const useAxios = () => {
//   const accessToken = Cookies.get("access_token");
//   const refreshToken = Cookies.get("refresh_token");

//   const axiosInstance = axios.create({
//     baseURL: API_BASE_URL,
//   });

//   axiosInstance.interceptors.request.use(async (req) => {
//     if (accessToken && !isAccessTokenExpired(accessToken)) {
//       req.headers.Authorization = `Bearer ${accessToken}`;
//     } else if (refreshToken) {
//       try {
//         const response = await getRefreshedToken(refreshToken);
//         setAuthUser(response.access, response.refresh);
//         req.headers.Authorization = `Bearer ${response.access}`;
//       } catch (error) {
//         console.error("Failed to refresh token", error);
//       }
//     }
//     return req;
//   });

//   return axiosInstance;
// };

// export default useAxios;