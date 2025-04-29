import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathToIndex = {
    '/': 0,
    '/info': 1,
    '/free': 2,
    '/community': 3,
  };

  const handleChange = (_, idx) => {
    const routes = ['/', '/info', '/free', '/community'];
    navigate(routes[idx]);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#333', boxShadow: 'none' }}
    >
      <Tabs
        value={pathToIndex[location.pathname] ?? 0}
        onChange={handleChange}
        variant="fullWidth"
        textColor="inherit"
        TabIndicatorProps={{
          style: {
            backgroundColor: '#8a2be2',
            height: '3px',
          },
        }}
      >
        <Tab label="홈" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        <Tab label="정보게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        <Tab label="자유게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        <Tab label="커뮤니티게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
      </Tabs>
    </AppBar>
  );
}
