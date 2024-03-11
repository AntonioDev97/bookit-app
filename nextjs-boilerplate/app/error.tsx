"use client"

import { IUserApp } from "@/interfaces/user.interface";
import { setNotification } from "@/redux/features/notifications.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Email, ErrorOutline, Reset } from "@carbon/icons-react";
import { Button } from "@carbon/react";

interface Props {
    error: Error,
    reset?: () => void
}

const Error = ({ error, reset }: Props) => {
    const { user }: IUserApp = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    dispatch(setNotification({ kind: 'error', title: 'An error has occured', subtitle: error?.message || 'Unknow' }));
    // Error log handler.
    console.error(`[${error.stack?.split("\n")[1]?.trim() || 'stack unknow' }][${user?.emailAddress || 'user unkown'}]:  ${error?.message || 'unknow'}`, error);
    return (
        <div id="error-boundary">
            <div className="error-wrapper">
                <h2>{error?.message}</h2>
                <h4><strong>Opps!</strong> Something went wrong! <ErrorOutline size={18} /></h4>
                <p>
                    Sorry for inconvience, if error persist please contact to <a href="mailto:app@help.com">app@help.com</a> <Email size={20}/>
                </p>
                <Button onClick={() => reset?.()} renderIcon={Reset}>
                    Try again
                </Button>
            </div>
        </div>
    );
};

export default Error;