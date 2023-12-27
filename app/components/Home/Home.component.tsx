'use client'

import React from 'react';
import PropTypes from 'prop-types';
import RoomItem from '../RoomItem';
import { IRoom } from '@/backend/models/room.model';
import Pagination from '../Pagination';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Props {
    data: {
        pagination: { limit: number },
        rooms: IRoom[],
        total: number,
        count: number
    } 
};

const Home = ({ data }: Props) => {
    const { rooms,  pagination: { limit }, total, count } = data;
    const location = useSearchParams().get('location');
    
    return (
        <div>
            <section id="rooms" className="container mt-5">
                <h2 className="mb-3 ml-2 stays-heading">
                    { location ? `${count} rooms found in ${location}` : 'All Rooms' }
                </h2>
                <Link href="/search" className="ml-2 back-to-search">
                    <i className="bi bi-arrow-left me-1"></i> Back to Search
                </Link>
                <div className="row mt-4">
                    { rooms?.length <  1 ? 
                    <div className="alert alert-danger mt-5 w-100"><b>No Rooms.</b></div>
                    :
                    rooms.map(room => <RoomItem key={room._id} data={room} />)
                    } 
                </div>
            </section>
            <Pagination resPerPage={limit} totalFound={total} />
        </div>
    );
};

Home.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.object),
    resPerPage: PropTypes.number,
    total: PropTypes.number
}


export default Home;