import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  height: 75px;
  color: #4A90E2;

`;
const HeaderWrapper = styled.div`
`;

const HeaderItem = styled.div`
  color: #FFF;
  font-size: 24px;
`;

const header = () => (
  <HeaderContainer>
    Header
    <HeaderWrapper>
      <HeaderItem>
        My Tasks
      </HeaderItem>
      <HeaderItem>
        In Progress
      </HeaderItem>
      <HeaderItem>
        Completed
      </HeaderItem>
    </HeaderWrapper>
  </HeaderContainer>
);

export default header;
