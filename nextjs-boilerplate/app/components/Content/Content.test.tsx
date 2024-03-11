import { render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import Content from '.';
import '@testing-library/jest-dom'

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}));

describe('<Content />', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    });

    it('Render Content container', () => {
        useSelectorMock.mockReturnValue({ theme: 'g100', active: true, data: [] });

        const { container } = render(<Content><h2>My Content</h2></Content>);
        const myContent = screen.getByText('My Content');
        const toastDiv = container.querySelector('#toast-notifications-containter');

        expect(myContent).toBeInTheDocument();
        expect(container.getElementsByClassName('cds--content').length).toBe(1);
        expect(toastDiv).toBeInTheDocument();
    });

    it('Render Content container without toast container', () => {
        useSelectorMock.mockReturnValue({ theme: 'g100', active: false, data: [] });

        const { container } = render(<Content><h2>My Content</h2></Content>);
        const myContent = screen.getByText('My Content');
        const toastDiv = container.querySelector('#toast-notifications-containter');

        expect(myContent).toBeInTheDocument();
        expect(container.getElementsByClassName('cds--content').length).toBe(1);
        expect(toastDiv).not.toBeInTheDocument();
    });
});