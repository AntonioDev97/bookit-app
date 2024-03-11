import { cleanup, render, screen, waitFor } from '@testing-library/react';
import ToastNotifications from '.';
import '@testing-library/jest-dom';
import { ToastNotificationProps } from '@carbon/react';

describe('<ToastNotifications />', () => {
    afterEach(cleanup);
    it('Render ToastNotifications component', () => {
        const data = [
            { title: 'Toast Notification Test #1', subtitle: 'Toast Notification subtitle #1', kind: 'success', timeout: 0 },
            { title: 'Toast Notification Test #2', subtitle: 'Toast Notification subtitle #2', kind: 'info', timeout: 0 },
            { title: 'Toast Notification Test #3', subtitle: 'Toast Notification subtitle #3', kind: 'warning', timeout: 0 },
            { title: 'Toast Notification Test #4', subtitle: 'Toast Notification subtitle #4', kind: 'error', timeout: 0 }
        ];
        const { container } = render(<ToastNotifications data={data as ToastNotificationProps[]} />);

        const notification1 = screen.getByText(data[0].title);
        const notification2 = screen.getByText(data[1].title);
        const notification3 = screen.getByText(data[2].title);
        const notification4 = screen.getByText(data[3].title);
        const successNotification = container.querySelector('div.cds--toast-notification--success');
        const infoNotification = container.querySelector('div.cds--toast-notification--info');
        const warningNotification = container.querySelector('div.cds--toast-notification--warning');
        const errorNotification = container.querySelector('div.cds--toast-notification--error');

        expect(notification1).toBeInTheDocument();
        expect(notification2).toBeInTheDocument();
        expect(notification3).toBeInTheDocument();
        expect(notification4).toBeInTheDocument();
        expect(successNotification).toBeInTheDocument();
        expect(infoNotification).toBeInTheDocument();
        expect(warningNotification).toBeInTheDocument();
        expect(errorNotification).toBeInTheDocument();
    });

    it('Render ToastNotifications component with timeout', async () => {
        const data = [
            { title: 'Toast Notification Test #1', subtitle: 'Toast Notification subtitle #1', kind: 'success', timeout: 1500 },
            { title: 'Toast Notification Test #2', subtitle: 'Toast Notification subtitle #2', kind: 'info', timeout: 1500 },
            { title: 'Toast Notification Test #3', subtitle: 'Toast Notification subtitle #3', kind: 'warning', timeout: 1500 },
            { title: 'Toast Notification Test #4', subtitle: 'Toast Notification subtitle #4', kind: 'error', timeout: 1500 }
        ];
        const { container } = render(<ToastNotifications data={data as ToastNotificationProps[]} />);

        const notification1 = screen.getByText(data[0].title);
        const notification2 = screen.getByText(data[1].title);
        const notification3 = screen.getByText(data[2].title);
        const notification4 = screen.getByText(data[3].title);
        const successNotification = container.querySelector('div.cds--toast-notification--success');
        const infoNotification = container.querySelector('div.cds--toast-notification--info');
        const warningNotification = container.querySelector('div.cds--toast-notification--warning');
        const errorNotification = container.querySelector('div.cds--toast-notification--error');

        expect(notification1).toBeInTheDocument();
        expect(notification2).toBeInTheDocument();
        expect(notification3).toBeInTheDocument();
        expect(notification4).toBeInTheDocument();
        expect(successNotification).toBeInTheDocument();
        expect(infoNotification).toBeInTheDocument();
        expect(warningNotification).toBeInTheDocument();
        expect(errorNotification).toBeInTheDocument();

        await waitFor(
            async () => await new Promise((r) => setTimeout(r, data[0].timeout + 1000)), 
            { timeout: data[0].timeout + 1500 }
        );

        expect(notification1).not.toBeInTheDocument();
        expect(notification2).not.toBeInTheDocument();
        expect(notification3).not.toBeInTheDocument();
        expect(notification4).not.toBeInTheDocument();
        expect(successNotification).not.toBeInTheDocument();
        expect(infoNotification).not.toBeInTheDocument();
        expect(warningNotification).not.toBeInTheDocument();
        expect(errorNotification).not.toBeInTheDocument();
    }, 4000);
});