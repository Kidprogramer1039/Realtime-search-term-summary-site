// src/pages/LoginCallback.js
import React from 'react';
import { useAuthCallback } from '../hooks/useAuthCallback';

const LoginCallback = () => {
  useAuthCallback();  
  return <p>로그인 처리 중입니다…</p>;
};

export default LoginCallback;
