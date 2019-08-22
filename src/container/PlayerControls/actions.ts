import {AnyAction} from "redux";
import {PLAYERCONTROLS_EXAMPLE} from "./constants";

export function SetExample(text: string): AnyAction {
    return {
        type: PLAYERCONTROLS_EXAMPLE,
        text
    }
}
