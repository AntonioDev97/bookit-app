import { UserRoles } from "@/interfaces/user.interface";

declare module "next-auth" {
    interface Session {
        roles: Array<UserRoles>;
    }

    interface User {
        roles: Array<UserRoles>;
    }
}