import {useDispatch, useStore} from "react-redux";
import {reducerName} from "./reducer";
import {IPlayerControlsState} from "./state";
import {Seek} from "./actions";
import {Dispatch} from "redux";

export class PlayerController {

    dispatch: Dispatch;
    store: any;

    constructor(dispatch: Dispatch, store: any) {
        this.dispatch = dispatch;
        this.store = store;
        setInterval(() => {
            if (this.GetPlayerControlsState().isPlaying) {
                const newPostition: number = (this.GetPlayerControlsState().playback.position as number) + 0.1;
                this.dispatch(Seek(newPostition, false))
            }
        }, 100)
    }

    private GetPlayerControlsState(): IPlayerControlsState {
        return this.store.getState()[reducerName];
    }

}