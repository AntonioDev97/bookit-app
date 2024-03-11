import { ToastNotificationProps } from "@carbon/react";

type Themes = 'g100' | 'white';

export interface ISettings {
    theme: Themes,
    loading: boolean,
    tour: boolean
};

export interface INotifications {
    active: boolean,
    data: ToastNotificationProps[]
}