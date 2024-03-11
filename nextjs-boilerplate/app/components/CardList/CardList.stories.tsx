import type { Meta, StoryObj } from '@storybook/react';
import CardList from ".";
import { Provider } from 'react-redux';
import { store } from '@/stories/redux/store';
import { useAppSelector } from '@/stories/redux/hooks';
import { ARG_REDUX_PATH } from 'addon-redux';
import { Theme } from '@carbon/react';

const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet metus augue. Donec in velit mi. Duis bibendum, ligula venenatis lacinia fermentum, ex libero feugiat mi, et mollis purus enim at ipsum.';
const listItems = [
    { title: 'Title Card 1', description: loremText, href: '#', hrefTarget: 'app' },
    { title: 'Title Card 2', description: loremText, href: '#', hrefTarget: 'app' },
    { title: 'Title Card 3', description: loremText, href: '#', hrefTarget: 'app' },
    { title: 'Title Card 4', description: loremText, href: '#', hrefTarget: 'app' },
    { title: 'Title Card 5', description: loremText, href: '#', hrefTarget: 'app' },
    { title: 'Title Card 6', description: loremText, href: '#', hrefTarget: 'app' }
];
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
    title: 'Card List',
    component: CardList,
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
        items: {
            description: 'Card Items',
            control: { type: 'object' },
        }
    }
} satisfies Meta;

type Story = StoryObj<typeof CardList>;

export default meta;
export const Default: Story = {
    args: {
        items: listItems,
    },
    decorators: [(Story) => (<main style={{ padding: '3rem' }}><Story /></main>)]
};
