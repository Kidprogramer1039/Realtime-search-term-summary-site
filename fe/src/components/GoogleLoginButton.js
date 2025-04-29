import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import styled, { createGlobalStyle } from 'styled-components';

// 1) 글로벌 스타일로 Noto Sans KR 폰트 로드
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

  body, button {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

// 2) 버튼 스타일에 폰트 지정
const LoginButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color .2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const GOOGLE_AUTH_URL = 'http://ec2-43-203-119-186.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google';

const GoogleLoginButton = () => {
  const handleClick = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <>
      {/* 전역 폰트 적용 */}
      <GlobalStyle />

      <LoginButton onClick={handleClick}>
        <FcGoogle size={24} style={{ marginRight: '8px' }} />
        구글로 로그인
      </LoginButton>
    </>
  );
};

export default GoogleLoginButton;
