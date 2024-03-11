import { MenuItem } from "@/interfaces/menu.interface";
import { UserRoles } from "@/interfaces/user.interface";

export const clearMenuOptions = (menu: MenuItem[], roles: UserRoles[]) =>
    menu.reduce((acc: MenuItem[], mitem: MenuItem) => {
        if (mitem.roles.some(role => roles.includes(role as UserRoles))) {
            mitem.subItems = mitem.subItems?.filter(smitem => smitem.roles.some(role => roles.includes(role as UserRoles)))
            acc.push(mitem);
        }
        return acc;
    }, []);
// Redux persistant store
export const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};