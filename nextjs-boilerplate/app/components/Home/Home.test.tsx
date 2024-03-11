import { render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import Home from '.';
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

describe('<Home />', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    });

    it('Render Home component', () => {
        useSelectorMock.mockReturnValue({ theme: 'g100' });
        const { container } = render(<Home />);

        const homeHeader = screen.getByText('Home Page - Welcome');
        const userInfo = screen.getByText('Please Sign In to view User Options');
        const tourBtn = container.querySelector('button.cds--btn');

        const cardList1 = screen.getByText('Title Card 1');
        const cardList2 = screen.getByText('Title Card 2');
        const cardList3 = screen.getByText('Title Card 3');
        const cardList4 = screen.getByText('Title Card 4');
        const cardList5 = screen.getByText('Title Card 5');
        const cardList6 = screen.getByText('Title Card 6');

        expect(homeHeader).toBeInTheDocument();
        expect(userInfo).toBeInTheDocument();
        expect(tourBtn).toHaveTextContent('Take Guided Tour');

        expect(cardList1).toBeInTheDocument();
        expect(cardList2).toBeInTheDocument();
        expect(cardList3).toBeInTheDocument();
        expect(cardList4).toBeInTheDocument();
        expect(cardList5).toBeInTheDocument();
        expect(cardList6).toBeInTheDocument();
    });

    it('Render Home component with user logged', () => {
        const mockedReduxState = {
            theme: 'g100',
            isAuthenticated: true,
            user: {
                name: 'User Test',
                emailAddress: 'test@test.com',
                roles: ['user'],
                isAuthenticated: true
            }
        };
        useSelectorMock.mockReturnValue(mockedReduxState);
        const { container } = render(<Home />);

        const homeHeader = screen.getByText(`Home Page - Welcome ${mockedReduxState.user.name}`);
        const loginText = screen.queryByText('Please Sign In to view User Options');
        const tourBtn = container.querySelector('button.cds--btn');

        const cardList1 = screen.getByText('Title Card 1');
        const cardList2 = screen.getByText('Title Card 2');
        const cardList3 = screen.getByText('Title Card 3');
        const cardList4 = screen.getByText('Title Card 4');
        const cardList5 = screen.getByText('Title Card 5');
        const cardList6 = screen.getByText('Title Card 6');

        expect(homeHeader).toBeInTheDocument();
        expect(loginText).not.toBeInTheDocument();
        expect(tourBtn).toHaveTextContent('Take Guided Tour');

        expect(cardList1).toBeInTheDocument();
        expect(cardList2).toBeInTheDocument();
        expect(cardList3).toBeInTheDocument();
        expect(cardList4).toBeInTheDocument();
        expect(cardList5).toBeInTheDocument();
        expect(cardList6).toBeInTheDocument();
    });
});