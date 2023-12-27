import { IRoom } from "@/backend/models/room.model";
import React from "react";

interface IProps {
  data: IRoom;
}

const RoomServices = ({ data }: IProps) => {
  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features:</h3>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
        <p>{data?.guestCapacity} Guests</p>
      </div>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
        <p>{data?.numBeds} Beds</p>
      </div>
      <div className="room-feature">
        <i
          className={
            data?.services.breakfast
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"
        ></i>
        <p>Breakfast</p>
      </div>
      <div className="room-feature">
        <i
          className={
            data?.services?.internet
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"
        ></i>
        <p>Internet</p>
      </div>
      <div className="room-feature">
        <i
          className={
            data?.services?.airConditioned
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"
        ></i>
        <p>Air Conditioned</p>
      </div>
      <div className="room-feature">
        <i
          className={
            data?.services?.petsAllowed
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"
        ></i>
        <p>Pets Allowed</p>
      </div>
      <div className="room-feature">
        <i
          className={
            data?.services?.roomCleaning
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"
        ></i>
        <p>Room Cleaning</p>
      </div>
    </div>
  );
};

export default RoomServices;