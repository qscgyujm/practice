/* eslint no-shadow: "off" */

import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import {
  saga as todoSaga,
  reducer as todoReducer,
} from './todo';

export function* rootSaga() {
  yield all([
    ...todoSaga,
  ]);
}

export const rootReducer = combineReducers({
  Todo: todoReducer,
});
