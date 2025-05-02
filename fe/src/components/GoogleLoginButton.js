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

// 테스트할 때 이거랑 API_BASE만 localhost:8080으로 변경하고 
// 배포용 
const API_BASE = process.env.REACT_APP_API_BASE_URL || window.location.origin;
// // 테스트용
// const API_BASE = `http://localhost:8080`;
const GoogleLoginButton = () => {
  const handleClick = () => {
    // 테스트용
    // window.location.href = `${API_BASE}/oauth2/authorization/google`;
    // 배포용
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