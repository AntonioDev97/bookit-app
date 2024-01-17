"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const UserSidebar = () => {
  const pathname = usePathname();

  const menuItem = [
    {
      name: "Profile",
      url: "/users/me",
      icon: "fa fa-user",
    },
    {
      name: "Avatar",
      url: "/users/me/avatar",
      icon: "fa fa-user-circle",
    },
    {
      name: "Password",
      url: "/users/me/password",
      icon: "fa fa-lock",
    },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState(pathname);

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="list-group mt-5 pl-4">
      {menuItem.map((menuItem, index) => (
        <Link
          key={index}
          href={menuItem.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem === menuItem.url ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={activeMenuItem === menuItem.url ? "true" : "false"}
        >
          <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
        </Link>
      ))}
    </div>
  );
};

export default UserSidebar;