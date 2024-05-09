import AllUsers from "@/app/components/AllUsers";
import Error from "@/app/error";
import { getAuthHeader } from "@/helpers/authHeader.helper";

export const metadata = {
    title: "All Users - ADMIN",
};

const getAllUsers = async () => {
    const authHeaders = getAuthHeader();

    const res = await fetch(
        `${process.env.API_URL}/api/admin/users`,
        authHeaders
    );
    return res.json();
};

export default async function AdminBookingsPage() {
    const data = await getAllUsers();    

    if (data?.message) return <Error error={data} />;

    return <AllUsers users={data?.users} />;
};