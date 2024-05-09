import Error from "@/app/error";
import UpdateUser from "@/app/components/AdminUpdateUser";
import { getAuthHeader } from "@/helpers/authHeader.helper";

interface Props {
    params: { id: string };
}

export const metadata = {
    title: "Update User - ADMIN",
};

const getUser = async (id: string) => {
    const authHeader = getAuthHeader();
    const res = await fetch(`${process.env.API_URL}/api/admin/users/${id}`, authHeader);
    return res.json();
};

export default async function UpdateUserPage({ params }: Props) {
    const data = await getUser(params?.id);

    if (data?.message) return <Error error={data} />;

    return <UpdateUser data={data} />;
}