import React, { ReactNode } from 'react';
import styled from 'styled-components';

// CSS in JS : CSS를 js 안에 작성함
// styled-components, emotion, styled-jsx, ...
// 각 컴포넌트마다 격리된 스타일 적용 가능



const StyledBox = styled.div`
    width: 100%;
    height: 46px;
    background-color: #0056F3;
    color: white;
    line-height: 50px;
  /* &:hover {
    transform: translateY(-20px);
  } */
`;

interface LoginBtnProps {
    children: ReactNode;
  }
  
  function LoginBtnComponent({ children }: LoginBtnProps) {
    return (
      <StyledBox>
        {children}
      </StyledBox>
    );
  }



export default LoginBtnComponent;
