'use client'

import { IRoom } from '@/backend/models/room.model';
import React from 'react';
import StarRatings from 'react-star-ratings';
import ImageSlider from '../ImageSlider';
import RoomServices from '../RoomServices';
import DatePicker from '../DatePicker';
import Review from '../Review';
import ListReviews from '../ListReviews';

interface IProps {
    data: IRoom
}

const RoomDetails = ({ data }: IProps) => {
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
                    <DatePicker data={data} />
                </div>
            </div>

            <Review />
            <ListReviews />
        </div>

    );
};

export default RoomDetails;