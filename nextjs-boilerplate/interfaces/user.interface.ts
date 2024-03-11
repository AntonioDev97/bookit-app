export type UserRoles = 'admin' | 'user' | 'public';

export interface IUserApp {
    user: IUser | null,
    isAuthenticated: boolean
}

export interface IUser {
    name: string,
    emailAddress: string,
    roles: Array<UserRoles>,
    isAuthenticated: boolean
};