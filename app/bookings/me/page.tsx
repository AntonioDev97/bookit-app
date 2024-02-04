import Bookings from '@/app/components/Bookings';
import Error from '@/app/error';
import { getAuthHeader } from '@/helpers/authHeader.helper';
import React from 'react'

export const metadata = {
    title: 'My Bookings'
}

const getBookings = async () => {
    const authHeader = getAuthHeader();
    const res = await fetch(`${process.env.API_URL}/api/bookings/user`, authHeader);
    return res.json();
};

const BookingsMePage = async () => {
    const data = await getBookings();
    if (data?.errMessage) return <Error error={data} />;
    return <Bookings data={data} />;
}

export default BookingsMePage;