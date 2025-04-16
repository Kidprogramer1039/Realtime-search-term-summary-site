import { FcGoogle } from 'react-icons/fc';
import styled from 'styled-components';

const LoginButton = styled.button`
  font-size: 25px;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const GoogleLoginButton = () => {
  const handleClick = () => {
    alert('구글 로그인 (UI만 구현)');
  };

  return (
    <LoginButton onClick={handleClick}>
      <FcGoogle size={30} style={{ marginRight: '0px' }} />
    </LoginButton>
  );
};

export default GoogleLoginButton;