"use client"

import React from 'react';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import './_header.style.scss';

interface Props {
    title: string,
    description?: string,
    breadCrumb: {
        text: string,
        link: string
    }[]
}

const Header = ({ title, breadCrumb, description }: Props) => {
    return (
        <section id='header-section'>
            <Breadcrumb noTrailingSlash>
                {Array.isArray(breadCrumb) && breadCrumb.map((item, index) =>
                    <BreadcrumbItem
                        key={`bc-item-${item.text}`}
                        isCurrentPage={(index + 1) === breadCrumb.length}>
                        <Link href={item.link} className='navlink'>
                            {item.text}
                        </Link>
                    </BreadcrumbItem>
                )}
            </Breadcrumb>
            <h2>{title}</h2>
            { description ? <p>{description}</p> : null }
        </section>
    );
};

export default Header;