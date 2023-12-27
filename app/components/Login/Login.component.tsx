"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../ButtonLoader";

const Login = () => {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
    loading: false
  }); 
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginState(prev => ({ ...prev, loading: true }));
    const result = await signIn("credentials", {
      redirect: false,
      email: loginState.email,
      password: loginState.password,
    });

    setLoginState(prev => ({ ...prev, loading: false }));

    if (result?.error) {
      toast.error(result.error);
    } else {
      router.replace("/");
    }
  };
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h1 className="mb-3">Login</h1>
          <div className="mb-3">
            <label className="form-label" htmlFor="email_field">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={loginState.email}
              onChange={(e) => setLoginState(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password_field">
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={loginState.password}
              onChange={(e) => setLoginState(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>

          <Link href="/password/forgot" className="float-end mt-2">
            Forgot Password?
          </Link>

          <button
            id="login_button"
            type="submit"
            className="btn form-btn w-100 py-2"
            disabled={loginState.loading}
          >
            {loginState.loading ? <ButtonLoader /> : "LOGIN"}
          </button>

          <div className="mt-3 mb-4">
            <Link href="/register" className="float-end">
              {" "}
              New User? Register Here{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;