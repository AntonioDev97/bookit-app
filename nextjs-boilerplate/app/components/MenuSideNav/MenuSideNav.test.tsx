import { render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import * as nextAuth from 'next-auth/react'
import MenuSideNav from '.';
import config from '@/app/config.json';
import '@testing-library/jest-dom'
import { clearMenuOptions } from '@/utils/helpers.util';
import { UserRoles } from '@/interfaces/user.interface';

jest.mock("next/navigation", () => ({
    useRouter() {
        return { prefetch: () => null };
    },
    usePathname() {
        return '';
    },
}));
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
    useSession: jest.fn()
}));

describe('<MenuSideNav />', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    const useSessionMock = jest.spyOn(nextAuth, 'useSession');

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });
    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    });

    it('Render MenuSideNav component', () => {
        useSelectorMock.mockReturnValue({ theme: 'g100' });
        useSessionMock.mockReturnValue({ data: null, status: 'unauthenticated', update: () => Promise.resolve(null) });
        useDispatchMock.mockReturnValue(jest.fn());

        const { container } = render(<MenuSideNav />);

        const publicLinkItems = clearMenuOptions(config.menuUpperLinks, ['public']);
        const publicMenuItems = clearMenuOptions(config.menuItems, ['public']);

        const headerTitle = screen.getByText(config.home.title);
        const linkItems = container.querySelectorAll('ul.cds--header__menu-bar>li');
        const menuItems = container.querySelectorAll('ul.cds--side-nav__items>li');
        const loginBtn = container.querySelector('[aria-label="Login"]');

        expect(headerTitle).toBeInTheDocument();
        expect(linkItems.length).toBe(publicLinkItems.length);
        expect(menuItems.length).toBe(publicMenuItems.length);
        expect(loginBtn).toBeInTheDocument();
    });

    it('Render MenuSideNav component logged user', () => {
        useSelectorMock.mockReturnValue({
            theme: 'g100',
            isAuthenticated: true,
            user: {
                name: 'User Test',
                emailAddress: 'test@test.com',
                roles: ['user'],
                isAuthenticated: true
            }
        });
        useSessionMock.mockReturnValue({
            data: { user: {
                name: 'Test User',
                email: 'test@test.com',
                image: null,
            },
            roles: ['user'] as UserRoles[],
            expires: new Date().toISOString()
            }, status: 'authenticated', update: () => Promise.resolve(null)
        });
        useDispatchMock.mockReturnValue(jest.fn());

        const { container } = render(<MenuSideNav />);

        const userLinkItems = clearMenuOptions(config.menuUpperLinks, ['public', 'user']);
        const userMenuItems = clearMenuOptions(config.menuItems, ['public', 'user']);

        const headerTitle = screen.getByText(config.home.title);
        const linkItems = container.querySelectorAll('ul.cds--header__menu-bar>li');
        const menuItems = container.querySelectorAll('ul.cds--side-nav__items>li');
        const loginBtn = container.querySelector('[aria-label="Login"]');
        const userProfile = container.querySelector('[aria-label="User Profile"]');

        expect(headerTitle).toBeInTheDocument();
        expect(linkItems.length).toBe(userLinkItems.length);
        expect(menuItems.length).toBe(userMenuItems.length);
        expect(loginBtn).not.toBeInTheDocument();
        expect(userProfile).toBeInTheDocument();
    });
});