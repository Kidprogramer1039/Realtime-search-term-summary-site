import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 32px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TitleWrapper = styled.div`
  line-height: 1.2;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <TitleWrapper>
        <Title>참견해주세요</Title>
        <Subtitle>자극적인 것을 좋아하는 현대인을 위한 소셜 피드백 플랫폼</Subtitle>
      </TitleWrapper>
    </HeaderContainer>
  );
}
