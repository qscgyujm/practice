import React from 'react';
import styled from 'styled-components';

import { WithModalProps } from '@Hoc/withModal';

import { IndexProps, Task } from '../ts/index';

import { ModalWrapper, ModalContent } from './styles/wrapper';

import AddTask from '../view/AddTask';

type PassingProps = Pick<IndexProps,
  'postTodo'
  | 'uploadFile'>
  & WithModalProps<{}>;

type AdditionalProps = {
  localState: Task;
  setLocalState: () => void;
}

type ModalProps = PassingProps
  & AdditionalProps;

const EnhanceModalContent = styled(ModalContent)`
  border-radius: 5px;
`;

const Modal: React.FC<ModalProps> = (props) => {
  const { toggleModal, postTodo, uploadFile } = props;

  return (
    <ModalWrapper
      maxWidth={550}
    >
      <EnhanceModalContent>
        <AddTask
          toggleModal={toggleModal}
          postTodo={postTodo}
          uploadFile={uploadFile}
        />
      </EnhanceModalContent>
    </ModalWrapper>
  );
};

export default Modal;
