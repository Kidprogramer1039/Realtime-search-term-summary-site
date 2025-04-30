// File: src/src/App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import InfoBoard from './pages/InfoBoard';
import FreeBoard from './pages/FreeBoard';
import CommunityBoard from './pages/CommunityBoard';
import LoginCallback from './pages/LoginCallback';
import BoardWritePage from './pages/BoardWritePage';
import './App.css';

function App() {
  const { pathname } = useLocation();

  // 로그인 콜백 경로에서는 레이아웃 없이 콜백 컴포넌트만 렌더링
  if (pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<LoginCallback />} />
      </Routes>
    );
  }

  // 일반 경로
  return (
    <>
      <Header />
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<InfoBoard />} />
        <Route path="/free" element={<FreeBoard />} />
        <Route path="/community" element={<CommunityBoard />} />
        <Route path="/write" element={<BoardWritePage />} />
        <Route path="/login/callback" element={<LoginCallback />} />
      </Routes>
    </>
  );
}

export default App;