import UpdateRoom from "@/app/components/UpdateRoom";
import Error from "@/app/error";
import { getAuthHeader } from "@/helpers/authHeader.helper";

export const metadata = {
    title: "Update Room - ADMIN",
};

interface Props {
    params: { id: string };
}

const getRoom = async (id: string) => {
    const authHeaders = getAuthHeader();
    const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, { headers: authHeaders.headers, next: { tags: ['RoomDetails'] } });
    return res.json();
};

export default async function AdminUpdateRoomPage({ params }: Props) {
    const data = await getRoom(params?.id);
    if (data?.message) return <Error error={data} />;
    return <UpdateRoom room={data?.data} />;
}