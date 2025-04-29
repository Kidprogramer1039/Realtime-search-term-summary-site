// src/pages/LoginCallback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name    = params.get('name');
    const access  = params.get('access_token');
    const refresh = params.get('refresh_token');

    if (access) {
      localStorage.setItem('name', name);
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }

    // 홈으로 돌아가면서 URL 쿼리 제거
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
}

export default LoginCallback;
