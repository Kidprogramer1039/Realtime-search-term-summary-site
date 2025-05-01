// src/App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header           from './components/Header';
import Navbar           from './components/Navbar';
import Sidebar          from './components/Sidebar';
import Home             from './pages/Home';
import InfoBoard        from './pages/InfoBoard';
import FreeBoard        from './pages/FreeBoard';
import CommunityBoard   from './pages/CommunityBoard';
import LoginCallback    from './pages/LoginCallback';
import './App.css';

function App() {
  const { pathname } = useLocation();

  // 🚀 로그인 콜백 경로에서는 레이아웃 없이 오로지 콜백 컴포넌트만
  if (pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<LoginCallback />} />
      </Routes>
    );
  }

  // 그 외의 경로에서는 헤더·네비·사이드바·컨텐츠 레이아웃
  return (
    <div className="app">
      <Header />
      <Navbar />

      <div className="main-layout" style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div className="page-content" style={{ flex: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<InfoBoard />} />
            <Route path="/free" element={<FreeBoard />} />
            <Route path="/community" element={<CommunityBoard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;