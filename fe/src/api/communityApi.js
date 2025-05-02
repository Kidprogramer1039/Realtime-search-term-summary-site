// src/api/communityApi.js
import axios from 'axios';

const { protocol, hostname } = window.location;
const API_BASE_URL = `${protocol}//${hostname}:8080`;

export default axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
