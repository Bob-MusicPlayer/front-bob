import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import reducerRegistry from "./utils/reducerRegistry";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas/rootSaga";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

let composeEnhancers = compose;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

const initialState: any = {};

const combine = (reducers: Array<() => {}>) => {
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach((item: any) => {
        if (reducerNames.indexOf(item) === -1) {
            reducers[item] = (state = null) => state;
        }
    });
    return combineReducers(reducers);
};

const sagaMiddleware = createSagaMiddleware({});

const middlewares = [sagaMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

const reducer = combine(reducerRegistry.getReducers());
const store = createStore(reducer, initialState, composeEnhancers(...enhancers));

sagaMiddleware.run(rootSaga);

reducerRegistry.setChangeListener((reducers: any) => {
    console.log(reducers);
    store.replaceReducer(combine(reducers));
});

export default store;
