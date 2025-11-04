import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-render-api.onrender.com/api', // Render 后端地址
  withCredentials: true, // 如果后端用 cookie 认证可保留
});

export default api;
