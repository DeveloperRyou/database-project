import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const getAccessToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("No accessToken in localStorage");
  }
  return accessToken as string;
};

api.interceptors.request.use(
  async function (config) {
    try {
      if (typeof document !== "undefined") {
        let accessToken = await getAccessToken();
        config.headers.set("authorization", accessToken);
      }
    } catch (err) {
      console.log(err);
    }
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default api;
