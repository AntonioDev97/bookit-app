import type { Meta, StoryObj } from '@storybook/react';
import GuideTour from ".";
import { Step } from 'react-joyride';

const steps: Step[] = [
    {
        content: <h2>Let&apos;s begin our journey!</h2>,
        placement: "center",
        "target": "body"
    },
    {
        content: <h4>This is an example of the guide tour</h4>,
        placement: "center",
        "target": "body"
    }
];

const meta = {
    title: 'Guided Tour',
    component: GuideTour,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
    argTypes: {
        steps: {
            description: 'Guide Tour Steps',
            control: { type: 'object' },
        }
    }
} satisfies Meta;

type Story = StoryObj<typeof GuideTour>;

export default meta;
export const Default: Story = {
    args: {
        steps,
    },
    decorators: [(Story) => (<main style={{ padding: '3rem' }}><Story /></main>)]
};
