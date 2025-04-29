import React from 'react';
import { useAuthCallback } from '../hooks/useAuthCallback';

const LoginCallback = () => {
  useAuthCallback();
  return <p>로그인 처리 중… 잠시만요.</p>;
};

export default LoginCallback;
