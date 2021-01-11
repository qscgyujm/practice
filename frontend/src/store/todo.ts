import { takeLatest, put, call } from 'redux-saga/effects';

import { Task } from '@Component/Todo/ts/index';

import {
  getTodoAPI,
  postTodoAPI,
  postFileAPI,
  putTodoAPI,
  delTodoAPI,
} from '@Api/index';

// State
const initialState = {
  isError: false,
  isFetching: false,
  taskList: [],
};

type TaskBody = Pick<Task, 'title'
  | 'file'
  | 'datelineAt'
  | 'comment'>

export type InitialState = Readonly<typeof initialState>

//  Action
export enum ActionType {
  FETCH_TODO_REQUEST= 'FETCH_TODO_REQUEST',
  FETCH_TODO_FAILURE= 'FETCH_TODO_FAILURE',
  FETCH_TODO_SUCCESS= 'FETCH_TODO_SUCCESS',
  CREATE_TODO_REQUEST= 'CREATE_TODO_REQUEST',
  CREATE_TODO_FAILURE= 'CREATE_TODO_FAILURE',
  CREATE_TODO_SUCCESS= 'CREATE_TODO_SUCCESS',
  UPDATE_TODO_REQUEST= 'UPDATE_TODO_REQUEST',
  UPDATE_TODO_FAILURE= 'UPDATE_TODO_FAILURE',
  UPDATE_TODO_SUCCESS= 'UPDATE_TODO_SUCCESS',
  UPLOAD_FILE_REQUEST= 'UPLOAD_FILE_REQUEST',
  UPLOAD_FILE_FAILURE= 'UPLOAD_FILE_FAILURE',
  UPLOAD_FILE_SUCCESS= 'UPLOAD_FILE_SUCCESS',
  DELETE_TODO_REQUEST= 'DELETE_TODO_REQUEST',
  DELETE_TODO_FAILURE= 'DELETE_TODO_FAILURE',
  DELETE_TODO_SUCCESS= 'DELETE_TODO_SUCCESS',
}

export const sagaAction = {
  fetchTodo: () => ({ type: ActionType.FETCH_TODO_REQUEST }),
  fetchTodoFailure: () => ({ type: ActionType.FETCH_TODO_FAILURE }),
  fetchTodoSuccess: (taskList) => ({ type: ActionType.FETCH_TODO_SUCCESS, taskList }),
  postTodo: (
    task: TaskBody,
    resolve?: () => void,
    reject?: () => void,
  ) => ({
    type: ActionType.CREATE_TODO_REQUEST,
    task,
    resolve,
    reject,
  }),
  postTodoFailure: () => ({ type: ActionType.CREATE_TODO_FAILURE }),
  postTodoSuccess: () => ({ type: ActionType.CREATE_TODO_SUCCESS }),
  updateTodo: (
    id: string,
    task: TaskBody,
  ) => ({ type: ActionType.UPDATE_TODO_REQUEST, id, task }),
  updateTodoFailure: () => ({ type: ActionType.UPDATE_TODO_FAILURE }),
  updateTodoSuccess: () => ({ type: ActionType.UPDATE_TODO_SUCCESS }),
  uploadFile: (file) => ({ type: ActionType.UPLOAD_FILE_REQUEST, file }),
  uploadFileFailure: () => ({ type: ActionType.UPLOAD_FILE_FAILURE }),
  uploadFileSuccess: (url) => ({ type: ActionType.UPLOAD_FILE_SUCCESS, url }),
  deleteTodo: (id: string) => ({ type: ActionType.DELETE_TODO_REQUEST, id }),
  deleteTodoFailure: () => ({ type: ActionType.DELETE_TODO_FAILURE }),
  deleteTodoSuccess: () => ({ type: ActionType.DELETE_TODO_SUCCESS }),
};

// Saga

function* fetchTodoSaga() {
  try {
    console.log('a');

    const { data } = yield call(getTodoAPI);
    console.log('data', data);
    const { data: taskList } = data;

    yield put(sagaAction.fetchTodoSuccess(taskList));
  } catch (error) {
    yield put(sagaAction.fetchTodoFailure());
  }
}

function* createTodoSaga(actionPayload: ReturnType<typeof sagaAction.postTodo>) {
  const { resolve, reject } = actionPayload;

  try {
    console.log('createTodoSaga', actionPayload);

    yield call(postTodoAPI, actionPayload.task);

    if (resolve) {
      resolve();
    }

    yield put(sagaAction.postTodoSuccess());
  } catch (error) {
    yield put(sagaAction.postTodoFailure());
  }
}

function* updateTodoSaga(actionPayload: ReturnType<typeof sagaAction.updateTodo>) {
  try {
    console.log('updateTodoSaga', actionPayload);

    yield call(putTodoAPI, actionPayload.id, actionPayload.task);

    yield put(sagaAction.updateTodoSuccess());
  } catch (error) {
    yield put(sagaAction.updateTodoFailure());
  }
}

function* uploadFileSaga(actionPayload: ReturnType<typeof sagaAction.uploadFile>) {
  try {
    console.log('updateTodoSaga', actionPayload);

    yield call(postFileAPI, actionPayload.file);

    yield put(sagaAction.updateTodoSuccess());
  } catch (error) {
    yield put(sagaAction.updateTodoFailure());
  }
}

function* deleteTodoSaga(actionPayload: ReturnType<typeof sagaAction.deleteTodo>) {
  try {
    console.log('deleteTodoSaga', actionPayload);

    yield call(delTodoAPI, actionPayload.id);

    yield put(sagaAction.deleteTodoSuccess());
  } catch (error) {
    yield put(sagaAction.deleteTodoFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_TODO_REQUEST, fetchTodoSaga),
  takeLatest(ActionType.CREATE_TODO_REQUEST, createTodoSaga),
  takeLatest(ActionType.UPDATE_TODO_REQUEST, updateTodoSaga),
  takeLatest(ActionType.UPLOAD_FILE_REQUEST, uploadFileSaga),
  takeLatest(ActionType.DELETE_TODO_REQUEST, deleteTodoSaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_TODO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionType.FETCH_TODO_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    case ActionType.FETCH_TODO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        taskList: action.taskList,
      };
    default:
      return state;
  }
};
