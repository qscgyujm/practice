import React from 'react';
import ReactDOM from 'react-dom';

// import App from '@Store/App';

// const thunkStore = (): Store => {
//   const middlewares = [thunk];

//   return createStore(thunRootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
// };

const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
};

render();

// ReactDOM.render(
//   <App />,
//   document.getElementById('root'),
// );
