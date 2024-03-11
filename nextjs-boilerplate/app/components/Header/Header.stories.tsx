import type { Meta, StoryObj } from '@storybook/react';
import Header from ".";

const meta = {
    title: 'Header',
    component: Header,
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
        title: {
            control: 'text',
            description: 'Title string text'
        },
        description: {
            control: 'text',
            description: 'Description string text'
        },
        breadCrumb: {
            description: 'Array ob breadCrumb items',
            control: { type: 'object' },
        }
    }
} satisfies Meta;

type Story = StoryObj<typeof Header>;

export default meta;
export const Default: Story = {
    args: {
        title: 'Test title',
        breadCrumb: [{ text: 'Home', link: '/' }]
    },
    decorators: [(Story) => (<main style={{ padding: '3rem' }}><Story /></main>)]
};

export const WithDescription: Story = {
    args: {
        title: 'Test title',
        description: 'Test description section',
        breadCrumb: [{ text: 'Home', link: '/' }]
    },
    decorators: [(Story) => (<main style={{ padding: '3rem' }}><Story /></main>)]
};
