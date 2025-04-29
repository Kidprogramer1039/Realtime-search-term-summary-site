// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AppBar   from '@mui/material/AppBar';
import Toolbar  from '@mui/material/Toolbar';
import Tabs     from '@mui/material/Tabs';
import Tab      from '@mui/material/Tab';
import Button   from '@mui/material/Button';
import Box      from '@mui/material/Box';
import GoogleLoginButton from './GoogleLoginButton';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(
    localStorage.getItem('name') || ''
  );

  // 경로가 바뀔 때마다(localStorage에 토큰/이름이 저장된 뒤) 다시 읽어서 UI 갱신
  useEffect(() => {
    setUserName(localStorage.getItem('name') || '');
  }, [location.pathname]);

  // 탭 인덱스 매핑
  const pathToIndex = { '/':0, '/info':1, '/free':2, '/community':3 };
  const indexToPath = Object.entries(pathToIndex)
    .reduce((acc,[path,i]) => { acc[i] = path; return acc; }, {});
  const currentTab = pathToIndex[location.pathname] ?? 0;

  const handleTabChange = (_, newValue) => {
    navigate(indexToPath[newValue]);
  };
  const handleLogout = () => {
    localStorage.clear();
    setUserName('');
    navigate('/', { replace: true });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar 
        disableGutters 
        sx={{ 
          px: 4, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}
      >
        {/* 탭 바 */}
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          variant="fullWidth"
          sx={{ flex: 1, minHeight: '56px' }}
        >
          <Tab label="홈" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
          <Tab label="정보게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
          <Tab label="자유게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
          <Tab label="커뮤니티게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        </Tabs>

        {/* 우측 인증 영역 */}
        <Box sx={{ ml: 2 }}>
          {userName
            ? (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/profile"
                  sx={{ textTransform: 'none' }}
                >
                  {userName}님
                </Button>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  sx={{ textTransform: 'none' }}
                >
                  로그아웃
                </Button>
              </>
            )
            : <GoogleLoginButton />
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
