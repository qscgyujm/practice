import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { rootReducer, rootSaga } from '@Store/index';
import GlobalStyle from '@Style/global';

import AppBlock from '@Component/App/index';
import TodoBlock from '@Component/Todo/index';

import { routes } from './constant/routes';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const sagaMiddleware = createSagaMiddleware();

const sagaStore = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const AppWrapper = styled.div`
  color: #F77;
`;

const App = () => (
  <Provider store={sagaStore}>
    <GlobalStyle />
    <HashRouter>
      <AppWrapper>
        <Switch>
          <Route exec path={routes.todo.base} component={TodoBlock} />
          <Route exec path={routes.base} component={AppBlock} />
        </Switch>
      </AppWrapper>
    </HashRouter>
  </Provider>
);

export default App;
