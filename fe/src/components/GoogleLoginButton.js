import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

  body, button {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const LoginButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
`;

const API_BASE = process.env.REACT_APP_API_BASE_URL || window.location.origin;
console.log('API_BASE =', API_BASE);  // ← 이 줄 추가

const GoogleLoginButton = () => {
  const handleClick = () => {
    window.location.href = `${API_BASE}:8080/oauth2/authorization/google`;
  };

  return (
    <>
      <GlobalStyle />
      <LoginButton onClick={handleClick}>
        <FcGoogle size={24} style={{ marginRight: '8px' }} />
        구글로 로그인
      </LoginButton>
    </>
  );
};

export default GoogleLoginButton;
