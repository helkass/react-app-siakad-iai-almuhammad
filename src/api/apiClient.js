import axios from "axios";

// const apiClient = axios.create({
//    baseURL:
//       import.meta.env.MODE === "development"
//          ? "http://localhost:5001/api/v1"
//          : import.meta.env.VITE_API_URL,
// });

const apiClient = axios.create({
   baseURL: "https://rose-delightful-hen.cyclic.app/api/v1",
});

export default apiClient;
