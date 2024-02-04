import BookingDetails from "@/app/components/BookingDetails";
import Error from "@/app/error";
import { getAuthHeader } from "@/helpers/authHeader.helper";

export const metadata = {
  title: "My Bookings Details",
};

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader();
  const res = await fetch(`${process.env.API_URL}/api/bookings/${id}`, authHeader);
  return res.json();
};

export default async function MyBookingsPage({ params }: { params: { id: string } }) {
  const data = await getBooking(params?.id);

  if (data?.errMessage) return <Error error={data} />;
  return <BookingDetails booking={data.booking} />;
}