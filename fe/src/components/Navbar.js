import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 라우트 경로와 탭 인덱스 매핑
  const pathToIndex = {
    '/': 0,
    '/info': 1,
    '/free': 2,
    '/community': 3,
  };

  // 반대로 인덱스 → 경로
  const indexToPath = Object.keys(pathToIndex).reduce((acc, path) => {
    acc[pathToIndex[path]] = path;
    return acc;
  }, {});

  // 현재 경로에 맞는 탭 인덱스 확인
  const currentTab = pathToIndex[location.pathname] ?? 0;

  // 탭 변경 시 라우팅
  const handleChange = (event, newValue) => {
    navigate(indexToPath[newValue]);
  };

  return (
    <AppBar 
      position="static"
      sx={{
        backgroundColor: '#333',   // 인벤 느낌의 어두운 색
        paddingLeft: 4,           // 양쪽 여백을 조금 더 줘서 넓은 느낌
        paddingRight: 4,
      }}
    >
      <Tabs
        value={currentTab}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
        variant="fullWidth"       // 전체 폭을 가득 채워 탭을 시원하게
        sx={{ minHeight: '56px' }} // 탭 바 높이를 조금 늘려서 답답함 해소
      >
        <Tab label="홈" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        <Tab label="정보게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        <Tab label="자유게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
        <Tab label="커뮤니티게시판" sx={{ fontWeight: 'bold', minHeight: '56px' }} />
      </Tabs>
    </AppBar>
  );
};

export default Navbar;