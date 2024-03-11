import { render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import Footer from '.';
import { IUser } from '@/interfaces/user.interface';
import config from '@/app/config.json';
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

describe('<Footer />', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    });

    const user: IUser = {
        name: 'test user',
        emailAddress: 'test@test.com',
        isAuthenticated: true,
        roles: ['user']
    }

    it('Render Footer all links', () => {
        useSelectorMock.mockReturnValue({ theme: 'g100' });
        const { container } = render(<Footer user={user} />);
        
        const publicLink = screen.getByText('Contact Us');
        const privateLink = screen.getByText('Private Link');
        
        expect(container.getElementsByClassName('footer-item').length).toBe(config.footerItems.length);
        expect(publicLink).toBeInTheDocument();
        expect(privateLink).toBeInTheDocument();
    });

    it('Render Footer public links', () => {
        useSelectorMock.mockReturnValue({ theme: 'g100' });
        user.isAuthenticated = false
        const { container } = render(<Footer user={user} />);
        
        const publicLink = screen.getByText('Contact Us');
        const privateLink = screen.queryByText('Private Link');
        
        expect(container.getElementsByClassName('footer-item').length).toBe(
            config.footerItems.length - config.footerItems.filter(item => item.roles.includes('user')).length);
        expect(publicLink).toBeInTheDocument();
        expect(privateLink).not.toBeInTheDocument();
    });
});