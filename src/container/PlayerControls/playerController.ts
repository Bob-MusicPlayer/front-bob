import {reducerName} from "./reducer";
import {IPlayerControlsState} from "./state";
import {Seek} from "./actions";
import {Dispatch} from "redux";
import {IGlobalState} from "../../utils/globalState";

export class PlayerController {

    dispatch: Dispatch;
    store: any;

    constructor(dispatch: Dispatch, store: any) {
        this.dispatch = dispatch;
        this.store = store;
        setInterval(() => {
            if (this.GetPlayerControlsState().playback !== null && this.GetPlayerControlsState().isPlaying && !this.GetGlobalState().loading) {
                const newPostition: number = (this.GetPlayerControlsState().playback.position as number) + 0.2;
                this.dispatch(Seek(newPostition, false))
            }
        }, 200)
    }

    private GetPlayerControlsState(): IPlayerControlsState {
        return this.store.getState()[reducerName];
    }

    private GetGlobalState(): IGlobalState {
        return this.store.getState()["Global"];
    }

}
