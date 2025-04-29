import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAuthCallback() {
  const navigate = useNavigate();
  const { search } = useLocation();  // ?name=…&access_token=…&refresh_token=…

  useEffect(() => {
    const params = new URLSearchParams(search);
    const name = params.get('name');
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (name && accessToken && refreshToken) {
      // 토큰과 사용자 이름을 로컬 스토리지에 저장
      localStorage.setItem('USER_NAME', name);
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      localStorage.setItem('REFRESH_TOKEN', refreshToken);
      // 홈으로 리다이렉트
      navigate('/', { replace: true });
    }
  }, [search, navigate]);
}
