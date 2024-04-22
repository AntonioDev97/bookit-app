"use client";

import { useLazyUpdateSessionQuery, useUpdateAvatarMutation } from "@/redux/api/auth.api";
import { setUser } from "@/redux/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../ButtonLoader";
import Image from "next/image";

const UpdateAvatar = () => {
    const dispatch = useAppDispatch();
    const [uploadAvatar, { isLoading, error, isSuccess }] = useUpdateAvatarMutation();
    const router = useRouter();

    const [updateSession, { data }] = useLazyUpdateSessionQuery();

    useEffect(() => {
        if (data) dispatch(setUser(data?.user));
    // eslint-disable-next-line
    }, [data]);

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");

    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (user?.avatar) setAvatarPreview(user?.avatar?.url);
        if (error && "data" in error) toast.error(error?.data?.message);

        if (isSuccess) {
            //@ts-ignore
            updateSession();
            toast.success('Avatar updated successfully');
        }
    // eslint-disable-next-line
    }, [user, error, isSuccess]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        uploadAvatar({ avatar });
    };

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = Array.from(e.target.files || []);
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result as string);
                setAvatarPreview(reader.result as string);
            }
        };
        reader.readAsDataURL(files[0]);
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-8">
                <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                    <h2 className="mb-4">Upload Avatar</h2>
                    <div className="form-group">
                        <div className="d-flex align-items-center">
                            <div className="me-3">
                                <figure className="avatar item-rtl">
                                    <Image
                                        src={avatarPreview}
                                        className="rounded-circle"
                                        alt="image"
                                    />
                                </figure>
                            </div>
                            <div className="input-foam">
                                <label className="form-label" htmlFor="customFile">
                                    Choose Avatar
                                </label>
                                <input
                                    type="file"
                                    name="avatar"
                                    className="form-control"
                                    id="customFile"
                                    accept="images/*"
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn form-btn w-100 py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? <ButtonLoader /> : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateAvatar;