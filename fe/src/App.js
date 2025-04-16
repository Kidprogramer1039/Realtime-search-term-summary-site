import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../Realtime-search-term-summary-site/fe/src/components/Navbar';
import Sidebar from '../Realtime-search-term-summary-site/fe/src/components/Sidebar';
import Home from '../Realtime-search-term-summary-site/fe/src/pages/Home';
import InfoBoard from '../Realtime-search-term-summary-site/fe/src/pages/InfoBoard';
import FreeBoard from '../Realtime-search-term-summary-site/fe/src/pages/FreeBoard';
import CommunityBoard from '../Realtime-search-term-summary-site/fe/src/pages/CommunityBoard';
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
