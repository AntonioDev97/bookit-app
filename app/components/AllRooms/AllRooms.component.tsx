"use client";

import { IRoom } from "@/backend/models/room.model";
// import { useDeleteRoomMutation } from "@/redux/api/room.api";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {
    rooms: IRoom[];
}

const AllRooms = ({ rooms }: Props) => {
    const router = useRouter();

    // const [deleteRoom, { error, isSuccess }] = useDeleteRoomMutation();

    /* useEffect(() => {
        if (error && "data" in error) {
            toast.error(error?.data?.errMessage);
        }

        if (isSuccess) {
            router.refresh();
            toast.success("Room deleted");
        }
    }, [error, isSuccess]); */

    const setRooms = () => {
        const data: { columns: any[]; rows: any[] } = {
            columns: [
                {
                    label: "Room ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
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

        rooms?.forEach((room) => {
            data?.rows?.push({
                id: room._id,
                name: room.name,
                actions: (
                    <>
                        <Link
                            href={`/admin/rooms/${room._id}`}
                            className="btn btn-outline-primary"
                        >
                            {" "}
                            <i className="fa fa-pencil"></i>{" "}
                        </Link>
                        <Link
                            href={`/admin/rooms/${room._id}/upload_images`}
                            className="btn btn-outline-success ms-2"
                        >
                            {" "}
                            <i className="fa fa-file-image-o"></i>{" "}
                        </Link>
                        <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => deleteRoomHandler(room._id)}
                        >
                            {" "}
                            <i className="fa fa-trash"></i>{" "}
                        </button>
                    </>
                ),
            });
        });

        return data;
    };

    const deleteRoomHandler = (id: string) => {
        // deleteRoom(id);
    };

    return (
        <div>
            <h1 className="my-5 position-relative">
                {`${rooms?.length || 0} Rooms`}
                <Link
                    href="/admin/rooms/new"
                    className="mt-0 btn text-white position-absolute end-0 form-btn"
                >
                    Create Room
                </Link>
            </h1>

            <MDBDataTable data={setRooms()} className="px-3" bordered striped hover />
        </div>
    );
};

export default AllRooms;
