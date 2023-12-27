import dbConnect from "../config/dbConnect";
import Room from "../models/room.model";
import { rooms } from "./data";
require('dotenv').config({ path: '.env.local' })


const seedRooms = async () => {
  try {
    await dbConnect();

    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("Rooms are added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();