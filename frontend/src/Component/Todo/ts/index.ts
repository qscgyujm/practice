import { bindActionCreators, Dispatch } from 'redux';

import { sagaAction, InitialState } from '@Store/todo';

interface State {
  Todo: InitialState
}

export type Task = {
  id: string;
  title: string;
  file: string | null;
  comment: string | null;
  datelineAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const mapStateToProps = (state: State) => ({ ...state.Todo });

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    fetchTodo,
    postTodo,
    updateTodo,
    uploadFile,
    deleteTodo,
  } = sagaAction;

  return {
    ...bindActionCreators({
      fetchTodo,
      postTodo,
      updateTodo,
      uploadFile,
      deleteTodo,
    }, dispatch),
  };
};

export type WithTodoStoreProps = (
  ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>
)

export type PassingProps = WithTodoStoreProps;

type AdditionalProps = {
  setTaskList: () => void;
}

export type IndexProps = PassingProps
  & AdditionalProps;
