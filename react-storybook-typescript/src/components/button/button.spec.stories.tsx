
import * as React from 'react';
import { Button } from "./button"

export default {
    component: Button,
    title: 'Components|Button/Tests',
};

export const TestOnClick = () => {

    const [text, setText] = React.useState("not clicked")

    return (
        <div>
            <Button
                onClick={() => setText("clicked")}
            >
                Click to set text 1
                </Button>
            <div access-id="text-target">{text}</div>
        </div>
    )
}
