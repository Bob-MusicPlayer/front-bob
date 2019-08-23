import {AnyAction} from "redux";
import {SEARCH_EXAMPLE} from "./constants";

export function SetExample(text: string): AnyAction {
    return {
        type: SEARCH_EXAMPLE,
        text
    }
}
