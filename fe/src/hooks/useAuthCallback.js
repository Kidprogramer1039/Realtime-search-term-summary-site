import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && name) {
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      localStorage.setItem('REFRESH_TOKEN', refreshToken);
      localStorage.setItem('USER_NAME', name);
      navigate('/', { replace: true });
    }
  }, [navigate]);
}
