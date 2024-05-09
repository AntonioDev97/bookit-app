import AllBookings from "@/app/components/AllBookings";
import Error from "@/app/error";
import { getAuthHeader } from "@/helpers/authHeader.helper";

export const metadata = {
  title: "All Bookings - ADMIN",
};

const getBookings = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/admin/bookings`, {
    headers: authHeaders.headers,
  });
  return await res.json();
};

export default async function AdminRoomsPage() {
  const data = await getBookings();
  console.log(data);
  

  if (data?.message || data?.data?.message) {
    return <Error error={data.data} />;
  }
  
  return <AllBookings bookings={data?.bookings} />;
}