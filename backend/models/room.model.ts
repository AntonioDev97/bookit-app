import mongoose, { Document, Schema } from "mongoose";
import fetch from "node-fetch";
import { IUser } from "./user.model";

export interface IRLocation {
    type: string,
    coordinates: number[],
    formattedAddress: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
};

export interface IRImages extends Document {
    public_id: string,
    url: string
}

export interface IRReview extends Document {
    user: IUser,
    rating: number,
    comment: string
};

export interface IRoom extends Document {
    name: string,
    description: string,
    priceNight: number,
    address: string,
    location: IRLocation,
    guestCapacity: number,
    numBeds: number,
    services: {
        internet: boolean,
        breakfast: boolean,
        airConditioned: boolean,
        petsAllowed: boolean,
        roomCleaning: boolean
    },
    ratings: number,
    numReviews: number,
    images: IRImages[],
    category: string,
    reviews: IRReview[],
    createdBy: Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
};

const roomSchema: Schema<IRoom> = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter room name'],
        trim: true,
        maxLength: [100, 'Room name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter room description'],
        trim: true
    },
    priceNight: {
        type: Number,
        required: [true, 'Please enter room price per night'],
        default: 0.0
    },
    address: {
        type: String,
        required: [true, 'Please enter room address'],
        trim: true,
        maxLength: [300, 'Room address cannot exceed 300 characters']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    guestCapacity: {
        type: Number,
        required: [true, '`Please enter room guest capacity'],
        min: [0, 'Value cannot be less than 1']
    },
    numBeds: {
        type: Number,
        required: [true, '`Please enter room beds'],
        min: [0, 'Value cannot be less than 1']
    },
    services: {
        internet: {
            type: Boolean,
            default: false
        },
        breakfast: {
            type: Boolean,
            default: false
        },
        airConditioned: {
            type: Boolean,
            default: false
        },
        petsAllowed: {
            type: Boolean,
            default: false
        },
        roomCleaning: {
            type: Boolean,
            default: false
        }
    },
    ratings: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please enter room category'],
        enum: {
            values: ['King', 'Single', 'Twins'],
            message: 'Plase select correct category for room'
        }
    },
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
},
{
    timestamps: true
});

roomSchema.pre("save", async function (next) {
    const loc: any = await (await fetch(
        `${process.env.GEOCODE_API_URL}/search?key=${process.env.GEOCODE_API_KEY}&format=json&addressdetails=1&q=${this.address}`
    )).json();
    this.location = {
        type: 'Point',
        coordinates: [loc[0].lon, loc[0].lat],
        formattedAddress: loc[0].display_name,
        city: loc[0].address.city,
        state: loc[0].address.state,
        zipCode: loc[0].address.postcode,
        country: loc[0].country_code
    };
});

export default mongoose.models.Room || mongoose.model<IRoom>("Room", roomSchema);