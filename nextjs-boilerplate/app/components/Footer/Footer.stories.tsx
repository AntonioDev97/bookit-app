import type { Meta, StoryObj } from '@storybook/react';
import Footer from ".";
import { Provider } from 'react-redux';
import { store } from '@/stories/redux/store';
import { ARG_REDUX_PATH } from 'addon-redux';

// A super-simple mock of a redux store
const Mockstore = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

const meta = {
    title: 'Footer',
    component: Footer,
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
        },
        user: {
            description: 'User state properties',
            control: { type: 'object' },
        }
    }
} satisfies Meta;

type Story = StoryObj<typeof Footer>;

export default meta;
export const Default: Story = {
    args: {
        user: { isAuthenticated: true, emailAddress: 'test@test.com', name: 'test user', roles: ['user'] },
    },
    decorators: [(Story) => (<main style={{ padding: '3rem' }}><Story /></main>)]
};
