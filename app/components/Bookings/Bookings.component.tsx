'use client'

import { IBooking } from '@/backend/models/booking.model'
import { Skeleton } from '@mui/material'
import { MDBDataTable } from 'mdbreact'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Props {
    data: {
        bookings: IBooking[]
    }
};

const Bookings = ({ data }: Props) => {
    const bookings = data?.bookings || [];
    const [loading, setLoading] = useState(true);
    const setBookings = () => {
        const data: { columns: any[]; rows: any[] } = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Check In",
                    field: "checkin",
                    sort: "asc",
                },
                {
                    label: "Check Out",
                    field: "checkout",
                    sort: "asc",
                },
                {
                    label: "Amount Paid",
                    field: "amountpaid",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc",
                },
            ],
            rows: [],
        };

        bookings?.forEach((booking) => {
            data?.rows?.push({
                id: booking._id,
                checkin: new Date(booking?.checkIn).toLocaleString("en-US"),
                checkout: new Date(booking?.checkOut).toLocaleString("en-US"),
                amountpaid: `$${booking?.paymentInfo?.amountPaid}`,
                actions: (
                    <>
                        <Link href={`/bookings/${booking._id}`} className="btn btn-primary">
                            {" "}
                            <i className="fa fa-eye"></i>{" "}
                        </Link>
                        <Link
                            href={`/bookings/${booking._id}/invoice`}
                            className="btn btn-success ms-2"
                        >
                            {" "}
                            <i className="fa fa-file"></i>{" "}
                        </Link>
                    </>
                ),
            });
        });
        return data;
    };

    useEffect(() => {
        setLoading(false);
    }, [])

    return (
        <div className="container">
            <h1 className="my-5">My Bookings</h1>
            { loading ?
            <Skeleton
                animation="wave"
                variant='rectangular'
                width={'100%'}
                height={500}
            />
            :
            <MDBDataTable
                data={setBookings()}
                className="px-3"
                bordered
                striped
                hover
            />
            }
            
        </div>
    )
}

export default Bookings;