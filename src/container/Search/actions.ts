import {AnyAction} from "redux";
import {SEARCH} from "./constants";

export function SetExample(text: string): AnyAction {
    return {
        type: SEARCH,
        text
    }
}
