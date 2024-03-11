import type { Meta, StoryObj } from '@storybook/react';
import ToastNotifications from ".";
import { Provider } from 'react-redux';
import { store } from '@/stories/redux/store';
import { useAppSelector } from '@/stories/redux/hooks';
import { ARG_REDUX_PATH } from 'addon-redux';
import { Theme } from '@carbon/react';

// A super-simple mock of a redux store
const Mockstore = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useAppSelector((state) => state.settings);
    return (
        <Provider store={store}>
            <Theme theme={theme}>
                {children}
            </Theme>
        </Provider>
    );
};

const meta = {
    title: 'Toast Notifications',
    component: ToastNotifications,
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
        data: {
            description: 'Array of notifications',
            control: { type: 'object' },
        }
    }
} satisfies Meta;

type Story = StoryObj<typeof ToastNotifications>;

export default meta;
export const Default: Story = {
    args: {
        data: [
            { title: 'Toast Notification Test #1', subtitle: 'Toast Notification subtitle #1', kind: 'success', timeout: 0 },
            { title: 'Toast Notification Test #2', subtitle: 'Toast Notification subtitle #2', kind: 'info', timeout: 0 },
            { title: 'Toast Notification Test #3', subtitle: 'Toast Notification subtitle #3', kind: 'warning', timeout: 0 },
            { title: 'Toast Notification Test #4', subtitle: 'Toast Notification subtitle #4', kind: 'error', timeout: 0 }
        ],
    },
    decorators: [(Story) => (<main style={{ padding: '3rem' }}><Story /></main>)]
};

export const Timeout: Story = {
    args: {
        data: [
            { title: 'Toast Notification Test #1', subtitle: 'Toast Notification subtitle #1', kind: 'success', timeout: 5000 },
            { title: 'Toast Notification Test #2', subtitle: 'Toast Notification subtitle #2', kind: 'info', timeout: 5000 },
            { title: 'Toast Notification Test #3', subtitle: 'Toast Notification subtitle #3', kind: 'warning', timeout: 5000 },
            { title: 'Toast Notification Test #4', subtitle: 'Toast Notification subtitle #4', kind: 'error', timeout: 5000 }
        ],
    },
    decorators: [(Story) => (<main style={{ padding: '3rem' }}><Story /></main>)]
};
