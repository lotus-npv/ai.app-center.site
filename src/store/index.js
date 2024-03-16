import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;

// import { configureStore } from '@reduxjs/toolkit'
// import createSagaMiddleware from 'redux-saga'

// import reducer from './reducers'
// import mySaga from './sagas'

// // Create the saga middleware
// const sagaMiddleware = createSagaMiddleware()
// const middleware = [sagaMiddleware]
// // Mount it on the Store
// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(middleware),
// })

// // Then run the saga
// sagaMiddleware.run(mySaga)
// export default store;
