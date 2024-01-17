"use client";

import { useRecoverPasswordMutation } from "@/redux/api/auth.api";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../ButtonLoader";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");

  const [recoverPassword, { isLoading, error, isSuccess }] = useRecoverPasswordMutation();

  useEffect(() => {
    if (error && "data" in error) toast.error(error?.data?.message);
    if (isSuccess) {
        toast.success("Email Sent Successfully");
        setEmail('');
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    recoverPassword({ email });
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">Forgot Password</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              {" "}
              Enter Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn form-btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;