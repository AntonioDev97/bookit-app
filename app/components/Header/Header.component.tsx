"use client";

import React from 'react';
import bookitLogo from '@/public/images/bookit_logo.png';
import Image from 'next/image';
import './_header.style.css';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data } = useSession();
  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className="navbar sticky-top py-2">
    <div className="container">
      <div className="col-6 col-lg-3 p-0">
        <div className="navbar-brand">
          <Link href="/">
            <Image
              style={{ cursor: "pointer" }}
              src={bookitLogo}
              alt="BookIT"
            />
          </Link>
        </div>
      </div>

      <div className="col-6 col-lg-3 mt-3 mt-md-0 text-end">
        { data?.user ? (
        <div className="ml-4 dropdown d-line">
          <button
            className="btn dropdown-toggle flex items-center"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav">
              <Image
                src={data?.user?.avatar?.url || "/images/default_avatar.jpg"}
                alt="User Avatar"
                className="rounded-circle placeholder-glow"
                height="50"
                width="50"
              />
            </figure>
            <span className="placeholder-glow ps-1">{data?.user?.name}</span>
          </button>

          <div
            className="dropdown-menu w-100"
            aria-labelledby="dropdownMenuButton1"
          >
            <Link href="/admin/dashboard" className="dropdown-item">
              Dashboard
            </Link>
            <Link href="/bookings/me" className="dropdown-item">
              My Bookings
            </Link>
            <Link href="/me/update" className="dropdown-item">
              Profile
            </Link>
            <Link href="/" onClick={logoutHandler} className="dropdown-item text-danger">
              Logout
            </Link>
          </div>
        </div>
        ) :
        ( 
          <React.Fragment>
            { data === undefined && (
              <div className="placeholder-glow">
                <figure className="avatar avatar-nv placeholder bg-secondary"></figure>
                <span className="placeholder w-25 bg-secondary ms-2"></span>
              </div>
            )}
            {data === null && (
            <Link
              href="/login"
              className="btn btn-danger px-4 text-white login-header-btn float-right"
            >
              Login
            </Link>
            )}    
          </React.Fragment>
        )}
      </div>
    </div>
    </nav>
  );
};

export default Header;