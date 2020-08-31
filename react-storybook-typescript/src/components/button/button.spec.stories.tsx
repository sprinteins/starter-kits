
import React from 'react';
import { Button } from "./button"

export default {
    component: Button,
    title: 'Components/Button/Tests',
};

export const TestOnClick = () => {

    const [text, setText] = React.useState("not clicked")

    return (
        <div>
            <Button
                onClick={() => setText("clicked")}
            >
                <span>click to set text</span>
            </Button>
            
            <div access-id="text-target">{text}</div>
        </div>
    )
}
