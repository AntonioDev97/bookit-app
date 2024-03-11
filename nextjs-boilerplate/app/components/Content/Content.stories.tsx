import type { Meta, StoryObj } from '@storybook/react';
import Content from '.';
import { Provider } from 'react-redux';
import { store } from '@/stories/redux/store';
import { useAppSelector } from '@/stories/redux/hooks';
import { ARG_REDUX_PATH } from 'addon-redux';
import { Theme } from '@carbon/react';

// A super-simple mock of a redux store
const Mockstore = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

const meta = {
    title: 'Content Container',
    component: Content,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: [
        (Story) => (
            <Mockstore>
                <Story />
            </Mockstore>
        ),
    ],
    argTypes: {
        theme: {
            name: 'Redux Carbon Theme',
            options: ['g100', 'white'],
            control: { type: 'inline-radio' },
            description: 'Carbon Theme',
            [ARG_REDUX_PATH]: 'settings.theme',
            defaultValue: 'g100'
        }
    }
} satisfies Meta;

type Story = StoryObj<typeof Content>;

export default meta;
export const Default: Story = {
    decorators: [(Story) => (<main style={{ padding: '3rem' }}><Story /></main>)]
};
