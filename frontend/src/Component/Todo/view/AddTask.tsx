import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { WithModalProps } from '@Hoc/withModal';
import { IndexProps } from '../ts/index';
import TaskItem from './TaskItem';

type PassingProps = Pick<WithModalProps<{}>, 'toggleModal'>
type AddItemProps = PassingProps
  & Pick<IndexProps, 'postTodo'
    | 'uploadFile'>;

const initialState = () => ({
  title: '',
  datelineAt: new Date(),
  comment: '',
  file: '',
});

const ButtonWrapper = styled.div`
`;

const EnhanceButton = styled(Button)`
  width: 50%;
`;

const AddTask: React.FC<AddItemProps> = (props) => {
  const { toggleModal, postTodo, uploadFile } = props;

  const [localState, setLocalState] = React.useState(initialState());

  const clickResetHandler = () => {
    setLocalState({ ...initialState() });
  };

  const clickAddHandler = () => {
    console.log(localState);

    const resolve = () => {
      toggleModal(false);
    };

    const reject = () => {
      console.log('reject');
    };

    postTodo(localState, resolve, reject);
  };

  return (
    <>
      <TaskItem
        localState={localState}
        setLocalState={setLocalState}
        uploadFile={uploadFile}
      />
      <ButtonWrapper />
      <ButtonWrapper>
        <EnhanceButton
          variant="danger"
          onClick={clickResetHandler}
        >
          Cancel
        </EnhanceButton>
        <EnhanceButton
          variant="primary"
          onClick={clickAddHandler}
        >
          Save
        </EnhanceButton>
      </ButtonWrapper>
    </>
  );
};

export default AddTask;
