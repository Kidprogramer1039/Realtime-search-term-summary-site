import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import InfoBoard from './pages/InfoBoard';
import FreeBoard from './pages/FreeBoard';
import CommunityBoard from './pages/CommunityBoard';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {/* 홈 컨텐츠는 "/" 경로에서만 표시 */}
      {location.pathname === '/' && (
        <div className="top-home">
          <Home />
        </div>
      )}

      <Navbar />

      <div className="main-layout">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/info" element={<InfoBoard />} />
            <Route path="/free" element={<FreeBoard />} />
            <Route path="/community" element={<CommunityBoard />} />
            {/* "/" 경로에서는 내용 없음 → 위에서 Home 이미 렌더링함 */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
