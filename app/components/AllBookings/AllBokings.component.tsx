"use client";

import { IBooking } from "@/backend/models/booking.model";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {
    bookings: IBooking[];
}

const AllBookings = ({ bookings }: Props) => {
    const router = useRouter();

    /* const [deleteBooking, { error, isSuccess }] = useDeleteRoomMutation();

    useEffect(() => {
        if (error && "data" in error) {
            toast.error(error?.data?.errMessage);
        }

        if (isSuccess) {
            router.refresh();
            toast.success("Room deleted");
        }
    }, [error, isSuccess, router]); */

    const setBookings = () => {
        const data: { columns: any[]; rows: any[] } = {
            columns: [
                {
                    label: "Booking ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Room",
                    field: "room",
                    sort: "asc",
                },
                {
                    label: "Guest",
                    field: "user",
                    sort: "asc",
                },
                {
                    label: "Check In",
                    field: "checkIn",
                    sort: "asc",
                },
                {
                    label: "Check Out",
                    field: "checkOut",
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
                room: booking.room?.name,
                user: booking.user?.name,
                checkIn: new Date(booking.checkIn).toLocaleString(),
                checkOut: new Date(booking.checkIn).toLocaleString(),
                actions: (
                    <>
                        <Link
                            href={`/bookings/${booking._id}`}
                            className="btn btn-outline-primary"
                        >
                            {" "}
                            <i className="fa fa-eye"></i>{" "}
                        </Link>
                        <Link
                            href={`/bookings/${booking._id}/invoice`}
                            className="btn btn-outline-success ms-2"
                        >
                            {" "}
                            <i className="fa fa-file"></i>{" "}
                        </Link>
                        <button
                            className="btn btn-outline-danger mx-2"
                            // disabled={isLoading}
                            // onClick={() => deleteBookingHandler(booking?._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        return data;
    };

    /* const deleteRoomHandler = (id: string) => {
        deleteRoom(id);
    };
 */
    return (
        <div>
            <h1 className="my-5 position-relative">
                {`${bookings?.length || 0} Bookings`}
                <Link
                    href="/admin/rooms/new"
                    className="mt-0 btn text-white position-absolute end-0 form-btn"
                >
                    Create Room
                </Link>
            </h1>

            <MDBDataTable data={setBookings()} className="px-3" bordered striped hover />
        </div>
    );
};

export default AllBookings;
