import {createStore, combineReducers, applyMiddleware, AnyAction} from 'redux'
import reducerRegistry from "./utils/reducerRegistry";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any
    }
}

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

const customMiddleWare = (store: any) => (next: (a: AnyAction) => void) => (action: AnyAction) => {
    switch (action.type) {
        case "search":

            break;
    }
};


const reducer = combine(reducerRegistry.getReducers());
const store = createStore(reducer, initialState, applyMiddleware(customMiddleWare));

reducerRegistry.setChangeListener((reducers: any) => {
    console.log(reducers);
    store.replaceReducer(combine(reducers));
});

export default store;
