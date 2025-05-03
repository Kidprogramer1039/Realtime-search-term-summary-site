// src/api/api.js
import axios from 'axios';

const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080/api/v1`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// 요청 인터셉터: 호출될 때마다 최신 토큰을 헤더에 추가
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
