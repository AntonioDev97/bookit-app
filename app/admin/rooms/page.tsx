import Error from "@/app/error";
import AllRooms from "@/app/components/AllRooms";
import { getAuthHeader } from "@/helpers/authHeader.helper";

export const metadata = {
  title: "All Rooms - ADMIN",
};

const getRooms = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/admin/rooms`, {
    headers: authHeaders.headers,
  });
  return await res.json();
};

export default async function AdminRoomsPage() {
  const data = await getRooms();

  if (data?.message || data?.data?.message) {
    return <Error error={data.data} />;
  }

  return <AllRooms rooms={data?.data?.rooms} />;
}