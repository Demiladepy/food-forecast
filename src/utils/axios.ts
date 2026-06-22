import axios from 'axios';

const PublicAxiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:8000/api/') as string,
  withCredentials: true
});


const PrivateAxiosInstance = axios.create({
  ...PublicAxiosInstance.defaults,
});
PrivateAxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('adminApiKey');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
PrivateAxiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export {
  PublicAxiosInstance,
  PrivateAxiosInstance
}