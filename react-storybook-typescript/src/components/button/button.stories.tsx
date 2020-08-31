import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, Props } from './button';

export default {
    title: 'Components/Button',
    component: Button,
} as Meta;

const Template: Story<Props> = ({
    children,
    onClick,
}) => {

    return (
        <Button onClick={onClick}>
            {children}
        </Button>
    );
}

export const Default = Template.bind({});
Default.args = {
    children: 'Button',
    onClick: () => { console.log('clicked') },
};
