import globalReducer from "./globalReducer";

export class ReducerRegistry {
    private _emitChange = (reducers: any) => {};
    private _reducers = {};

    getReducers(): any {
        return { globalReducer, ...this._reducers };
    }

    register(name: string, reducer: Function) {
        this._reducers = { ...this._reducers, [name]: reducer };
        if (this._emitChange) {
            this._emitChange(this.getReducers());
        }
    }

    setChangeListener(listener: (reducers: any) => void) {
        this._emitChange = listener;
    }
}

const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
