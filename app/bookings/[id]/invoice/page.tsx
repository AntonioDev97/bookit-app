import React from 'react';
import { getAuthHeader } from '@/helpers/authHeader.helper';
import Invoice from '@/app/components/Invoice';
import Error from '@/app/error';

export const metadata = {
    title: "Booking Invoice",
};

const getBooking = async (id: string) => {
    const authHeader = getAuthHeader();
    const res = await fetch(`${process.env.API_URL}/api/bookings/${id}`, authHeader);
    return res.json();
};

const InvoicePage = async ({ params }: { params: { id: string } }) => {
    const data = await getBooking(params?.id);

    if (data?.errMessage) return <Error error={data} />;
    return <Invoice booking={data.booking} />;
}

export default InvoicePage