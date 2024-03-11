"use client"
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Theme } from '@carbon/react';
import ToastNotifications from '../ToastNotifications';

interface Props {
    children: React.ReactNode
}

const Content = ({ children }: Props) => {
    const { theme } = useAppSelector((state) => state.settings);
    const { active, data } = useAppSelector((state) => state.notifications);
    return (
        <Theme
            id='main-container'
            theme={theme}
        >
            <main className='cds--content'>
                {children}
            </main>
            { active && <ToastNotifications data={data} /> }
        </Theme>
    );
};

export default Content;