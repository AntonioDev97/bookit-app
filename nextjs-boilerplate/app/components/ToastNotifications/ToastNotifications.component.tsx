import { ToastNotification, ToastNotificationProps } from '@carbon/react';
import React from 'react';
import './_toastNotifications.style.scss';

interface Props {
    data: ToastNotificationProps[]
};

const ToastNotifications = ({ data }: Props) => {
    data = data.filter((obj, index) => index === data.findIndex(o => 
        obj.title === o.title && 
        obj.subtitle === o.subtitle &&
        obj.caption === o.caption
    ));

    return (
        <div id='toast-notifications-containter'>
            {data.map((notify, index) =>
            <ToastNotification
                key={`globalNotification#${index}`}
                className='toast-notification'
                aria-label='toastNotification'
                kind={notify.kind}
                title={notify.title}
                subtitle={notify.subtitle}
                timeout={notify.timeout === 0 ? 0 : (notify.timeout || 6000)}
                caption={notify.caption || new Date().toLocaleString()}
            />
            )}
        </div>
    );
};

export default ToastNotifications;