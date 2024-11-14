import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // ou o endereço da sua API
  withCredentials: true, // Isso garante que os cookies serão enviados nas requisições
});

// Adicionando o CSRF token em todas as requisições
axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/);
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken[1];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
