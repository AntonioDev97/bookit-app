import type { Meta, StoryObj } from '@storybook/react';
import MenuSideNav from ".";
import { Provider } from 'react-redux';
import { store } from '@/stories/redux/store';
import { useAppSelector } from '@/stories/redux/hooks';
import { ARG_REDUX_PATH } from 'addon-redux';
import { SessionProvider } from 'next-auth/react';

// A super-simple mock of a redux store
const Mockstore = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useAppSelector((state) => state.settings);
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    );
};

const meta = {
    title: 'Menu SideNav',
    component: MenuSideNav,
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
    }
} satisfies Meta;

type Story = StoryObj<typeof MenuSideNav>;

export default meta;
export const Default: Story = {
    args: { },
    decorators: [(Story) => (<main style={{ padding: '10rem' }}><Story /></main>)]
};
export const Responsive: Story = {
    parameters: {
        viewport: { defaultViewport: 'tablet' }
    },
    decorators: [(Story) => (<main style={{ width: '100px' }}><Story /></main>)]
};
