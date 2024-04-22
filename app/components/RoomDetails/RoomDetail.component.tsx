"use client"

import { IRoom } from '@/backend/models/room.model';
import React, { useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import ImageSlider from '../ImageSlider';
import RoomServices from '../RoomServices';
import DatePicker from '../DatePicker';
import Review from '../Review';
import ListReviews from '../ListReviews';
import MapLibreGL from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface IProps {
    data: IRoom
}

const RoomDetails = ({ data }: IProps) => {

    useEffect(() => {
        if (data?.location?.coordinates) {
            // initialize the map on the "map" div with a given center and zoom
            const map = new MapLibreGL.Map({
                container: 'room-map',
                style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
                center: data?.location?.coordinates as [1, 1], // starting position [lng, lat]
                zoom: 2 // starting zoom
            });

            new MapLibreGL.Marker().setLngLat(data?.location?.coordinates as [1, 1]).addTo(map);
        }
    // eslint-disable-next-line
    }, []);

    return (
        <div className="container container-fluid">
            <h2 className="mt-5">{data.name}</h2>
            <p>{data?.address || ''}</p>

            <div className="ratings mt-auto mb-3">
                <StarRatings
                    rating={data?.ratings}
                    starRatedColor="#e61e4d"
                    numberOfStars={5}
                    starDimension="22px"
                    starSpacing="1px"
                    name="rating"
                />
                <span className="no-of-reviews">({data?.numReviews} Reviews)</span>
            </div>
            <ImageSlider images={data?.images} />

            <div className="row my-5">
                <div className="col-12 col-md-6 col-lg-8">
                    <h3>Description</h3>
                    <p>{data?.description}</p>

                    <RoomServices data={data} />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <DatePicker room={data} />
                    {data?.location?.coordinates &&
                        <div className="my-5">
                            <h4 className="my-2">Room Location</h4>
                            <div
                                id='room-map'
                                className="shadow rounded"
                                style={{ height: '180px', width: '100%' }}
                            >
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Review roomId={data?._id} />
            <ListReviews reviews={data?.reviews} />
        </div>

    );
};

export default RoomDetails;