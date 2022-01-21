import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../Reducers/index'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//localstorage saved name
const persistConfig = {
    key: 'root',
    storage
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(logger, ReduxThunk)
));
let persistor = persistStore(store)

export { store, persistor }