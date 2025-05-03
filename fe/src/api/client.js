// src/api/client.js
import axios from 'axios';

const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080/api/v1`;

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use(config => {
  // 로그인 시 localStorage.setItem('access_token', token) 으로 저장했다고 가정
  const token = localStorage.getItem('access_token');
  if (token) {
    // 만약 저장할 때 이미 'Bearer ' 접두어가 포함된 문자열이라면 아래처럼 쓰세요:
    // config.headers.Authorization = token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
