import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { EditItemProps } from '../ts/EditItem';

import TaskItem from './TaskItem';

const ItemWrapper = styled.div`
`;

const ButtonWrapper = styled.div`
`;

const EnhanceButton = styled(Button)`
  width: 50%;
`;

const EditItem: React.FC<EditItemProps> = (props) => {
  const {
    task, updateTodo, uploadFile, deleteTodo,
  } = props;
  const { id } = task;

  const [localState, setLocalState] = React.useState(task);

  const clickResetHandler = () => {
    setLocalState({ ...task });
  };

  const clickAddHandler = () => {
    console.log(localState);
    // updateTodo(id, localState);
  };

  const clickDeleteHandler = () => {
    deleteTodo(id);
  };

  return (
    <ItemWrapper>
      <TaskItem
        localState={localState}
        setLocalState={setLocalState}
        uploadFile={uploadFile}
      />
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
    </ItemWrapper>
  );
};

export default EditItem;
