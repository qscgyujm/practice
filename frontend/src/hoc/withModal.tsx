import React from 'react';
import ReactDOM from 'react-dom';
import { isNil, get } from 'lodash-es';
import { rgba } from 'polished';
import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

/** StyledComponents */

const ModalWrapper = styled.div`
  bottom: 0;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 70;
`;

const ModalContainer = styled.div`
  align-items: center;
  display: flex;
  margin: 1.75rem auto;
  min-height: calc(100% - (1.75rem * 2));
  padding: 0 16px;
  width: 100%;
`;

interface BackdropProps {
  backdropColor: string;
}

const Backdrop = styled.div`
  animation: ${FadeIn} 0.3s ease-in-out;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 60;
  background-color: ${(props: BackdropProps) => props.backdropColor};
`;

type ContentWrapperProps = {
  maxWidth: string;
};

export const ContentWrapper = styled.div`
  animation: ${ModalNormalSlide} 0.3s ease 0s both;
  background: #FFF;
  border-radius: 5px;
  margin: auto;
  max-width: ${(props: ContentWrapperProps) => props.maxWidth};
  width: 100%;
`;

/** End */

export type WithModalProps<P, S = {}> = {
  isViewModal: boolean;
  currentActiveModal: P;
  setCurrentActiveModal: React.Dispatch<P>;
  toggleModal: (bool?: boolean, modal?: P) => void;
  additionalProps: S;
  addExtraProps: (extra: Partial<S>) => void;
}

export function withModal<P, S = {}>(
  InnerComponent: any,
  option?: {
    backgroundColor?: string;
    currentActiveModal?: P;
  },
) {
  return (<Q extends {}>(
    OuterComponent: React.ComponentType<Q>,
  ) => class WithModal extends React.Component<Q, {
    isViewModal: boolean;
    currentActiveModal: P;
    additionalProps: S;
  }> {
      private bodyNode: any;

      // @ts-ignore
      private rootNode: HTMLElement;

      // @ts-ignore
      private renderNode: HTMLElement;

      constructor(props) {
        super(props);
        this.state = {
          // @ts-ignore
          isViewModal: false,
          // @ts-ignore
          currentActiveModal: null,
          // @ts-ignore
          additionalProps: null,
        };
      }

      componentDidMount() {
        // @ts-ignore
        this.renderNode = document.getElementById('modal');
        // @ts-ignore
        this.bodyNode = document.getElementsByTagName('body');
        // @ts-ignore
        this.rootNode = document.getElementById('root');
        const activeModal = get(option, 'currentActiveModal', null);
        if (activeModal) {
          this.setState({
            currentActiveModal: activeModal,
          });
        }
      }

      componentWillUnmount() {
        this.bodyNode[0].style = 'overflow: initial';
        this.rootNode.style.filter = 'none';
      }

      setCurrentActiveModal = (modal: P) => {
        this.setState({
          currentActiveModal: modal,
        });
      };

      toggleModal = (bool?: boolean, modal?: P) => {
        const updateVisibility = bool || !this.state.isViewModal;

        if (modal) {
          this.setCurrentActiveModal(modal);
        }

        if (isNil(bool)) {
          this.setState((prevState) => ({
            isViewModal: !prevState.isViewModal,
          }));
        } else {
          this.setState({
            isViewModal: bool,
          });
        }

        if (updateVisibility) {
          this.bodyNode[0].style = 'overflow: hidden';
          this.rootNode.style.filter = 'blur(5px)';
        } else {
          this.rootNode.style.filter = 'none';
          this.bodyNode[0].style = 'overflow: initial';
        }
      };

      addExtraProps = (extraProps: Partial<S>) => {
        this.setState((prevState) => ({
          additionalProps: {
            ...prevState.additionalProps,
            ...extraProps,
          },
        }));
      };

      render() {
        const {
          additionalProps,
          isViewModal,
          currentActiveModal,
        } = this.state;

        const backdropColor = get(option, ['backdropColor'], rgba('#000', 0.5));

        return (
          <>
            {
              isViewModal && (
                ReactDOM.createPortal(
                  <>
                    <Backdrop
                      backdropColor={backdropColor}
                    />
                    <ModalWrapper>
                      <ModalContainer>
                        <InnerComponent
                          {...this.props}
                          addExtraProps={this.addExtraProps}
                          additionalProps={additionalProps}
                          currentActiveModal={currentActiveModal}
                          isViewModal={isViewModal}
                          setCurrentActiveModal={this.setCurrentActiveModal}
                          toggleModal={this.toggleModal}
                        />
                      </ModalContainer>
                    </ModalWrapper>
                  </>, this.renderNode,
                )
              )
            }
            <OuterComponent
              {...this.props}
              addExtraProps={this.addExtraProps}
              additionalProps={additionalProps}
              currentActiveModal={currentActiveModal}
              isViewModal={isViewModal}
              setCurrentActiveModal={this.setCurrentActiveModal}
              toggleModal={this.toggleModal}
            />
          </>
        );
      }
    });
}
