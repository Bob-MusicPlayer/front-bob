import {AnyAction} from "redux";
import {PANEL_EXAMPLE} from "./constants";

export function SetExample(text: string): AnyAction {
    return {
        type: PANEL_EXAMPLE,
        text
    }
}
