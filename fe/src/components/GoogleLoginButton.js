import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
  body, button { font-family: 'Noto Sans KR', sans-serif; }
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

const GoogleLoginButton = () => {
  const handleClick = () => {
    // 상대 경로로만 호출하면
    // 개발 환경: localhost:3000/oauth2/authorization/google
    // 배포 환경: ec2-…:8080/oauth2/authorization/google
    window.location.href = ':8080/oauth2/authorization/google';
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
