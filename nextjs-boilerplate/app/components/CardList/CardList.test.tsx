import { render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import CardList from '.';
import '@testing-library/jest-dom'

jest.mock("next/navigation", () => ({
    useRouter() {
        return { prefetch: () => null };
    }
}));
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}));

describe('<CardList />', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    });

    it('Render card list with 6 items', () => {
        useSelectorMock.mockReturnValue({ theme: 'g100' });
        const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet metus augue. Donec in velit mi. Duis bibendum, ligula venenatis lacinia fermentum, ex libero feugiat mi, et mollis purus enim at ipsum.';
        const cardItems = [
            { title: 'Title Card 1', description: loremText, href: '#', hrefTarget: 'app' },
            { title: 'Title Card 2', description: loremText, href: '#', hrefTarget: 'app' },
            { title: 'Title Card 3', description: loremText, href: '#', hrefTarget: 'app' },
            { title: 'Title Card 4', description: loremText, href: '#', hrefTarget: 'app' },
            { title: 'Title Card 5', description: loremText, href: '#', hrefTarget: 'app' },
            { title: 'Title Card 6', description: loremText, href: '#', hrefTarget: 'app' }
        ];
        render(<CardList items={cardItems} />);
        
        const cardList1 = screen.getByText('Title Card 1');
        const cardList2 = screen.getByText('Title Card 2');
        const cardList3 = screen.getByText('Title Card 3');
        const cardList4 = screen.getByText('Title Card 4');
        const cardList5 = screen.getByText('Title Card 5');
        const cardList6 = screen.getByText('Title Card 6');
        
        expect(cardList1).toBeInTheDocument();
        expect(cardList2).toBeInTheDocument();
        expect(cardList3).toBeInTheDocument();
        expect(cardList4).toBeInTheDocument();
        expect(cardList5).toBeInTheDocument();
        expect(cardList6).toBeInTheDocument();
    });
});