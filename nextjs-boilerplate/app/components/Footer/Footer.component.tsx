"use client"

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Theme } from '@carbon/react';
import config from '@/app/config.json';
import { MenuItem } from '@/interfaces/menu.interface';
import { IUser, UserRoles } from '@/interfaces/user.interface';
import { clearMenuOptions } from '@/utils/helpers.util';
import Link from 'next/link';
import './_footer.style.scss';

interface Props {
  user?: IUser
};

const Footer = ({ user }: Props) => {
  const { theme } = useAppSelector((state) => state.settings);
  // Clear and format menu options.
  const roles = (user?.isAuthenticated) ? ['public', ...user.roles] : ['public'];
  const footerItems: MenuItem[] = clearMenuOptions(config.footerItems, roles as UserRoles[]);;

  return (
    <Theme theme={theme}>
      <div
        id='footer-container'
        className={`cds--${theme}`}
      >
        { footerItems.map((item: MenuItem) =>
        <Link
          key={`footer-link-${item.name}`}
          className='footer-item'
          href={item.hrefLink}
          target={item.targetLink}
        >
            {item.name}
        </Link>
        )}
      </div>
    </Theme>
  );
}

export default Footer;