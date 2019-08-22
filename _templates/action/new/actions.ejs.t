---
to: <%= path %>/actions.ts
inject: true
behind: "}"
---
export function SetExample(text: string): AnyAction {
    return {
        type: TEST_EXAMPLE,
        text
    }
}
