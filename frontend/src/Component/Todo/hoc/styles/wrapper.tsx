import styled, { css, keyframes } from 'styled-components';

const ModalNormalSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

type ModalWrapperProps = {
  maxWidth: number;
};

export const ModalWrapper = styled.section`
  animation: ${ModalNormalSlide} 0.3s ease 0s both;
  border-radius: 5px;
  margin: auto;
  max-width: ${(props: ModalWrapperProps) => `${props.maxWidth}px`};
  width: 100%;
  line-height: 1.5;
`;

interface ModalHeaderProps {
  withCancel?: boolean;
}

export const ModalHeader = styled.section`
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: space-between;
  max-width: inherit;
  padding: 30px 60px 30px 35px;
  position: relative;
  width: 100%;
  background-color: #F2F2F2;
  
  &::after {
    background-color: "#d8d8d8";
    bottom: 0;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  ${(props: ModalHeaderProps) => props.withCancel && css`
    border-top-right-radius: 20px;
  `}
`;

interface ModalContentProps {
  pureContent?: boolean;
}

export const ModalContent = styled.section`
  padding: 20px 37px 28px;
  background: #FFF;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  ${(props: ModalContentProps) => props.pureContent && css`
    padding: 40px;
    border-radius: 5px;
    line-height: 1.7;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    text-align: center;
  `}
`;
