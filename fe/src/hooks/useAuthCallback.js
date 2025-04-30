import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function useAuthCallback() {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const name = params.get('name');
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (name && accessToken && refreshToken) {
      localStorage.setItem('USER_NAME', name);
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      localStorage.setItem('REFRESH_TOKEN', refreshToken);
      navigate('/', { replace: true });
    }
  }, [search, navigate]);
}
