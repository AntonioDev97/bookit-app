"use client"

import { persistor, store } from "@/redux/store";
import { Loading } from "@carbon/react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
    children: React.ReactNode
}

export const GlobalProvider = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<Loading withOverlay />}
                persistor={persistor}
            >
                <SessionProvider>
                    {children}
                </SessionProvider>
            </PersistGate>
        </Provider>
    );
};