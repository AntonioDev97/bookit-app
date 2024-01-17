'use client';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../ButtonLoader";
import { setUser } from "@/redux/features/user.slice";
import { useLazyUpdateSessionQuery, useUpdateMutation } from "@/redux/api/auth.api";

const UpdateUser = () => {

    const [userState, setUserState] = useState({ name: '', email: '' });

    const router = useRouter();
    const dispatch = useAppDispatch();

    const { user: currentUser } = useAppSelector((state) => state.user);

    const [update, { isLoading, isSuccess, error }] = useUpdateMutation();
    const [updateSession, { data }] = useLazyUpdateSessionQuery();

    useEffect(() => {
        if (data) dispatch(setUser(data?.user));
    }, [data]);

    useEffect(() => {
        if (currentUser) setUserState({ name: currentUser?.name, email: currentUser?.email });
        if (error && "data" in error) toast.error(error?.data?.message);
        if (isSuccess) {
            //@ts-ignore
            updateSession();
            toast.success("User updated successfully!.");
            router.refresh();
        }
    }, [currentUser, error, isSuccess]);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = { name: userState.name, email: userState.email};
        update(userData);
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-8">
                <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                    <h2 className="mb-4">Update Profile</h2>

                    <div className="mb-3">
                        <label htmlFor="name_field" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            name="name"
                            value={userState.name}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email_field" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={userState.email}
                            onChange={onChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn form-btn w-100 py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? <ButtonLoader /> : "UPDATE"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
