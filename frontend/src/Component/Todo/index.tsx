import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash-es';

import { compose } from '@Helpers';
import { withModal, WithModalProps } from '@Hoc/withModal';
import withWrapper from '@Hoc/withWrapper';

import { sagaAction } from '@Store/todo';

import { IndexProps } from './ts/index';
import ModalComponent from './hoc/Modal';

import { PageContainer, PageWrapper } from './styles/wrapper';
import EditTask from './view/EditTask';

const ListWrapper = styled.div`
  > div:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const AddButton = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 15px;
  border-radius: 5px;
  size: 24px;
`;

type EnhanceIndexProps = IndexProps
  & WithModalProps<{}>;

const Base: React.FC<EnhanceIndexProps> = (props) => {
  const {
    taskList,
    toggleModal,
    updateTodo,
    uploadFile,
    deleteTodo,
  } = props;

  const clickAddItemHandler = () => {
    toggleModal(true);
  };

  return (
    <>
      <AddButton
        type="button"
        defaultValue="Add"
        onClick={clickAddItemHandler}
      />
      <ListWrapper>
        {
          taskList.map((task, i) => (
            <EditTask
              key={i.toString()}
              task={task}
              updateTodo={updateTodo}
              uploadFile={uploadFile}
              deleteTodo={deleteTodo}
            />
          ))
        }
      </ListWrapper>
    </>
  );
};

export default compose(
  withWrapper(PageContainer),
  withWrapper(PageWrapper),
  // connect(mapStateToProps, mapDispatchToProps),
  <P extends {}>(
    BaseComponent: React.ComponentType<P>,
  ): React.FC<P> => () => {
    // console.log('Base:', props);

    // const { taskList, fetchTodo } = props;
    const dispatch = useDispatch();

    const todo = useSelector((state) => {
      console.log('state', state);
      // @ts-ignore
      return state.todo;
    });

    console.log('todo:', todo);

    React.useEffect(() => {
      // dispatch(sagaAction.fetchTodo());
      dispatch(sagaAction.fetchTodo());
    }, [dispatch]);

    if (isEmpty(todo)) {
      return (
        <div>
          123
        </div>
      );
    }

    return (
      // @ts-ignore
      <BaseComponent
        taskList={todo}
      />
    );
  },
  withModal(ModalComponent),
)(Base);
