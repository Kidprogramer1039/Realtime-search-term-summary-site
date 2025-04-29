import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GoogleLoginButton from './GoogleLoginButton';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem('USER_NAME'));

  // 경로가 바뀔 때마다 USER_NAME 업데이트
  useEffect(() => {
    setUserName(localStorage.getItem('USER_NAME'));
  }, [location.pathname]);

  const pathToIndex = { '/': 0, '/info': 1, '/free': 2, '/community': 3 };
  const handleChange = (_, idx) => {
    const routes = ['/', '/info', '/free', '/community'];
    navigate(routes[idx]);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', boxShadow: 'none' }}>
      {userName ? (
        <div style={{ padding: '0 16px', fontWeight: 'bold' }}>
          {decodeURIComponent(userName)}님, 안녕하세요!
        </div>
      ) : (
        <GoogleLoginButton />
      )}
      <Tabs
        value={pathToIndex[location.pathname] ?? 0}
        onChange={handleChange}
        variant="fullWidth"
        textColor="inherit"
        indicatorColor="secondary"
        sx={{ minHeight: '56px' }}
      >
        <Tab label="홈" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        <Tab label="정보게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        <Tab label="자유게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        <Tab label="커뮤니티게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
      </Tabs>
    </AppBar>
  );
}
