// src/App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header           from './components/Header';
import Navbar           from './components/Navbar';
import Sidebar          from './components/Sidebar';

import Home             from './pages/Home';
import InfoBoard        from './pages/InfoBoard';

import FreeBoard        from './pages/FreeBoard';
import FreeWrite        from './pages/FreeWrite';
import FreeDetail       from './pages/FreeDetail';

import CommunityBoard   from './pages/CommunityBoard';
import CommunityWrite   from './pages/CommunityWrite';
import CommunityDetail  from './pages/CommunityDetail';

import Profile          from './pages/Profile';
import Shop             from './pages/Shop';

import AdsBoard         from './components/AdBoard';      // ← 광고게시판 리스트
import AdWrite          from './components/AdWrite';  // ← 광고글 쓰기

import LoginCallback    from './pages/LoginCallback';

import './App.css';

function App() {
  const { pathname } = useLocation();

  // 로그인 콜백 경로만 별도 렌더링
  if (pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<LoginCallback />} />
      </Routes>
    );
  }

  // 그 외 경로는 공통 레이아웃
  return (
    <div className="app">
      <Header />
      <Navbar />

      <div className="main-layout" style={{ display: 'flex', flex: 1 }}>
        <Sidebar />

        <div className="page-content" style={{ flex: 1, padding: '1rem' }}>
          <Routes>
            {/* 홈 */}
            <Route path="/" element={<Home />} />

            {/* 정보 게시판 */}
            <Route path="/info" element={<InfoBoard />} />

            {/* 자유게시판 */}
            <Route path="/free" element={<FreeBoard />} />
            <Route path="/free/write" element={<FreeWrite />} />
            <Route path="/free/:id" element={<FreeDetail />} />

            {/* 커뮤니티게시판 */}
            <Route path="/community" element={<CommunityBoard />} />
            <Route path="/community/write" element={<CommunityWrite />} />
            <Route path="/community/:id" element={<CommunityDetail />} />

            {/* 프로필 */}
            <Route path="/profile" element={<Profile />} />

            {/* 상점 */}
            <Route path="/shop" element={<Shop />} />

            {/* 광고게시판 */}
            <Route path="/ads" element={<AdsBoard />} />
            <Route path="/ads/write" element={<AdWrite />} />

            {/* 그 외 */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
