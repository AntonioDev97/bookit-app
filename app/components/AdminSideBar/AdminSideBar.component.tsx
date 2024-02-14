"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const AdminSidebar = () => {
    const pathname = usePathname();

    const menuItem = [
        {
            name: "Dashboard",
            url: "/admin/dashboard",
            icon: "fa fa-tachometer",
        },
        {
            name: "Rooms",
            url: "/admin/rooms",
            icon: "fa fa-hotel",
        },
        {
            name: "Bookings",
            url: "/admin/bookings",
            icon: "fa fa-file-text",
        },
        {
            name: "Users",
            url: "/admin/users",
            icon: "fa fa-user",
        },
        {
            name: "Reviews",
            url: "/admin/reviews",
            icon: "fa fa-star",
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
                    className={`fw-bold list-group-item list-group-item-action ${activeMenuItem === menuItem.url ? "active" : ""
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

export default AdminSidebar;