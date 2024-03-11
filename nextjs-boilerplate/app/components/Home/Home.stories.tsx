import type { Meta, StoryObj } from '@storybook/react';
import Home from ".";
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/stories/redux/store';
import { useAppSelector } from '@/stories/redux/hooks';
import { ARG_REDUX_PATH } from 'addon-redux';
import { Theme } from '@carbon/react';
import { setIsAuthenticated, setUser } from '@/redux/features/user.slice';

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
    title: 'Home',
    component: Home,
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

type Story = StoryObj<typeof Home>;

export default meta;
export const Default: Story = {
    args: { },
    decorators: [(Story) => {
        const dispatch = useDispatch();
        dispatch(setIsAuthenticated(false));
        dispatch(setUser(null));
        return <main style={{ padding: '3rem' }}><Story /></main>
    }]
};
export const WithUser: Story = {
    args: { },
    decorators: [(Story) => {
        const dispatch = useDispatch();
        dispatch(setIsAuthenticated(true));
        dispatch(setUser({
            name: 'User Test',
            emailAddress: 'test@test.com',
            roles: ['user'],
            isAuthenticated: true
        }));
        return <main style={{ padding: '3rem' }}><Story /></main>
    }]
};
