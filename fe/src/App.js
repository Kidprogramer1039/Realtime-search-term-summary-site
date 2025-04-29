import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import InfoBoard from './pages/InfoBoard';
import FreeBoard from './pages/FreeBoard';
import CommunityBoard from './pages/CommunityBoard';
import LoginCallback from './pages/LoginCallback';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginCallback />} />
      </Routes>

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
