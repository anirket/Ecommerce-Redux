import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../Reducers/index'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(logger, ReduxThunk)
));