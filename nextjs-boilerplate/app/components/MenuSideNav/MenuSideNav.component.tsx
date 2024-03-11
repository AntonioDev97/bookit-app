"use client"

import React, { useEffect, useMemo } from 'react';
import {
  Notification,
  Search,
  ColorSwitch, 
  Login
} from '@carbon/icons-react';
import * as CarbonIcons from '@carbon/icons-react';
import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  Loading,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
  Theme
} from '@carbon/react';
import config from '@/app/config.json';
import { usePathname, useRouter } from 'next/navigation';
import { HomeLink, MenuItem } from '@/interfaces/menu.interface';
import { UserRoles, IUserApp } from '@/interfaces/user.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLoading, setTheme } from '@/redux/features/settings.slice';
import { clearMenuOptions } from '@/utils/helpers.util';
import { signIn, useSession } from 'next-auth/react';
import { setIsAuthenticated, setUser } from '@/redux/features/user.slice';
import Image from 'next/image';
import './_menuSideNav.style.scss';

interface IMenuOptions {
  home: HomeLink,
  menuItems: MenuItem[],
  menuUpperLinks: MenuItem[]
}

const MenuSideNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data, status } = useSession();
  const { theme, loading } = useAppSelector((state) => state.settings);
  const { user, isAuthenticated }: IUserApp = useAppSelector(state => state.user);
  // Clear and format menu options.
  const { home, menuItems, menuUpperLinks }: IMenuOptions = useMemo(() => {
    const items: IMenuOptions = { home: config.home, menuItems: [], menuUpperLinks: [] };
    const roles = (isAuthenticated) ? ['public', ...(user?.roles||[])] : ['public'];
    items.menuItems = clearMenuOptions(config.menuItems, roles as UserRoles[]);
    items.menuUpperLinks = clearMenuOptions(config.menuUpperLinks, roles as UserRoles[]);
    return items;
  }, [user, isAuthenticated]);
  
  // Set Global arial-label title or name.
  const GlobalArialLabel = `${home.prefix} ${home.title}`;
  // Configure necessary handling functions.
  const renderIcon = (name: string) => {
    const IconComponent = CarbonIcons[name as keyof typeof CarbonIcons];
    return <IconComponent className="icon" />;
  };
  const handleNavigation = (targetLink: string, hrefLink: string) => {
    if (targetLink === '_blank') window.open(hrefLink, "_blank");
    else router.push(hrefLink);
  };
  const handleTheme = () => {
    dispatch(setTheme(theme === 'g100' ? 'white': 'g100'));
  };
  // Handle Sing In process.
  const handleSignIn = async () => {
    dispatch(setLoading(true));
    const result = await signIn('W3SSO');
    if (result?.error) return console.error(result.error);
    router.replace("/");
  };
  // Set session if exists.
  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
      if (data.user) dispatch(setIsAuthenticated(true));
    }
    dispatch(setLoading(false));
  }, [data, dispatch]);
  // functions to render necessary elements.
  const renderMenuItems: (menu: MenuItem) => React.JSX.Element = (menu: MenuItem) => (
    menu?.subItems?.length === 0 ?
      <HeaderMenuItem
        key={`menu-${menu.name}`}
        className='menu-item'
        onClick={() => handleNavigation(menu.targetLink, menu.hrefLink)}
        isActive={pathname === menu.hrefLink}
      >
        {menu.icon && renderIcon(menu.icon)} {menu.name}
      </HeaderMenuItem>
      :
      <HeaderMenu
        key={`menu-${menu.name}`}
        className='menu-item'
        isActive={pathname === menu.hrefLink}
        aria-label={menu.name}
        menuLinkName=''
        renderMenuContent={() =>
          <>
            <div className='multiple-menu-item'>
              {renderIcon(menu.icon)}{menu.name}
            </div>
            <CarbonIcons.ChevronDown className='cds--header__menu-arrow' />
          </>
        }
      >
        {(menu.subItems || []).map((submenu: MenuItem) => (
          <HeaderMenuItem
            key={`${menu.name}-submenu-${submenu.name}`}
            className='menu-item'
            onClick={() => handleNavigation(submenu.targetLink, submenu.hrefLink)}
          >
            {submenu.icon && renderIcon(submenu.icon)}{submenu.name}
          </HeaderMenuItem>
        ))}
      </HeaderMenu>
  );
  // return computed component
  return (
    <Theme theme={theme} >
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header
          id='menu-sidenav-container'
          aria-label={GlobalArialLabel}
        >
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName
            prefix={home.prefix}
            className='menu-item'
            onClick={() => handleNavigation(home.targetLink, home.hrefLink)}
          >
            {home.title}
          </HeaderName>
          <HeaderNavigation aria-label={GlobalArialLabel}>
            { menuUpperLinks.map((menu: MenuItem) => renderMenuItems(menu)) }
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search" onClick={() => console.log('search click')}>
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications" onClick={() => console.log('notification click')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Switch Theme" onClick={handleTheme}>
              <ColorSwitch size={20} />
            </HeaderGlobalAction>
            { isAuthenticated ? 
            <HeaderGlobalAction aria-label="User Profile" onClick={() => console.log('user profile click')} tooltipAlignment="end">
              <Image
                alt='user profile'
                className='user-image'
                src={`/api/w3images?email=${user?.emailAddress}`}
                width={25}
                height={25}
              />
            </HeaderGlobalAction>
            : 
            <HeaderGlobalAction aria-label="Login" onClick={handleSignIn} tooltipAlignment="end">
              <Login size={20} />
            </HeaderGlobalAction>
            }
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            onOverlayClick={onClickSideNavExpand}
            href="#main-content"
            onSideNavBlur={onClickSideNavExpand}
            isRail
          >
            { (data === undefined || loading || status === 'loading') && 
            <Loading withOverlay /> 
            }
            <SideNavItems>
              { menuItems.map((menu: MenuItem) =>
                menu?.subItems?.length === 0 ?
                <SideNavLink
                  key={`menu-${menu.name}`}
                  onClick={() => handleNavigation(menu.targetLink, menu.hrefLink)}
                  isActive={pathname === menu.hrefLink}
                  aria-current={pathname === menu.hrefLink}
                  renderIcon={CarbonIcons[menu.icon as keyof typeof CarbonIcons]}
                  className='menu-item'
                >
                  {menu.name}
                </SideNavLink>
                :
                <SideNavMenu
                  key={`menu-${menu.name}`}
                  title={menu.name}
                  className='menu-item'
                  isActive={pathname === menu.hrefLink}
                  aria-current={pathname === menu.hrefLink}
                  aria-label={menu.name}
                  renderIcon={CarbonIcons[menu.icon as keyof typeof CarbonIcons]}
                >
                  {(menu.subItems || []).map((submenu: MenuItem) => (
                    <SideNavMenuItem
                      key={`${menu.name}-submenu-${submenu.name}`}
                      className='submenu-item'
                      aria-current={pathname === menu.hrefLink}
                      onClick={() => handleNavigation(submenu.targetLink, submenu.hrefLink)}
                    >
                      {submenu.icon && renderIcon(submenu.icon)} {submenu.name}
                    </SideNavMenuItem>
                  ))}
                </SideNavMenu>
              )}
              { isSideNavExpanded &&
              <HeaderSideNavItems hasDivider={true}>
                { menuUpperLinks.map((menu: MenuItem) => renderMenuItems(menu)) }
              </HeaderSideNavItems>
              }
            </SideNavItems>
          </SideNav>
        </Header>
    )}/>
    </Theme>
  );
};

export default MenuSideNav;