"use client";

import { IUser } from "@/backend/models/user.model";
import { useUpdateUserFromAdminMutation } from "@/redux/api/auth.api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../ButtonLoader";

interface Props {
    data: {
        user: IUser;
    };
}

const UpdateUser = ({ data }: Props) => {
    const router = useRouter();
    const [updateUserState, setUpdateUserState] = useState({
        name: data?.user?.name,
        email: data?.user?.email,
        role: data?.user?.role
    });

    const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserFromAdminMutation();

    useEffect(() => {
        if (error && "data" in error) toast.error(error?.data?.errMessage);
        if (isSuccess) {
            router.refresh();
            toast.success("User Updated");
        }
    // eslint-disable-next-line
    }, [error, isSuccess]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            name: updateUserState.name,
            email: updateUserState.email,
            role: updateUserState.role,
        };

        updateUser({ id: data?.user?._id, body: userData });
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-8">
                <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                    <h2 className="mb-4">Update User</h2>

                    <div className="mb-3">
                        <label htmlFor="name_field" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            name="name"
                            value={updateUserState.name}
                            onChange={(e) => setUpdateUserState(prev => ({ ...prev, name: e.target.value }))}
                            required
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
                            value={updateUserState.email}
                            onChange={(e) => setUpdateUserState(prev => ({ ...prev, email: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="role_field" className="form-label">
                            Role
                        </label>
                        <select
                            id="role_field"
                            className="form-select"
                            name="role"
                            value={updateUserState.role}
                            onChange={(e) => setUpdateUserState(prev => ({ ...prev, role: e.target.value }))}
                            required
                        >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn form-btn w-100 mt-4 mb-3"
                        disabled={isLoading}
                    >
                        {isLoading ? <ButtonLoader /> : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;