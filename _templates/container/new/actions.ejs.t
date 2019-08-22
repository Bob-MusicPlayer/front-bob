---
    to: src/container/<%= name %>/actions.ts
---
import {AnyAction} from "redux";
import {<%= name.toUpperCase() %>_EXAMPLE} from "./constants";

export function SetExample(text: string): AnyAction {
    return {
        type: <%= name.toUpperCase() %>_EXAMPLE,
        text
    }
}
