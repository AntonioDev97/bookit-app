import { UserRoles } from "./user.interface";

export interface HomeLink {
    prefix: string,
    title: string,
    hrefLink: string,
    targetLink: string,
    roles: Array<UserRoles> | string[]
}

export interface MenuItem {
    name: string
    hrefLink: string,
    access: string,
    icon: string,
    targetLink: string,
    roles: Array<UserRoles> | string[],
    subItems?: MenuItem[]
};