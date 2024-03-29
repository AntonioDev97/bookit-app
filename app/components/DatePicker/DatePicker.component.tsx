"use client";

import React, { useEffect, useState } from 'react';
import { IRoom } from '@/backend/models/room.model';
import RDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { calculateDaysOfStay } from '@/helpers/date.helper';
import {
  useLazyAvailabilityQuery,
  useLazyStripeCheckoutQuery,
  useNewBookingMutation,
  useRoomBookedDaysQuery
} from '@/redux/api/booking.api';
import { useAppSelector } from '@/redux/hooks';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

interface IProps { room: IRoom }

const DatePicker = ({ room }: IProps) => {
  const { isAuth } = useAppSelector(state => state.user);
  const [dateState, setDateState] = useState({ checkin: new Date(), checkout: new Date() });
  const daysOfStay = calculateDaysOfStay(dateState.checkin, dateState.checkout);

  const [newBooking] = useNewBookingMutation();
  const [availability, { data }] = useLazyAvailabilityQuery();
  const { data: { dates } = {} } = useRoomBookedDaysQuery(room._id);
  
  const excludedDates = dates?.map((date: string) => new Date(date)) || [];
  const isAvailable = data?.isAvailable;  

  const onChangeDates = (dates: any[]) => {
    const [checkin, checkout] = dates;
    setDateState(prev => ({ ...prev, checkin, checkout }));
    if (checkin && checkout) {
      availability({
        id: room._id,
        checkIn: checkin.toISOString(),
        checkOut: checkout.toISOString()
      });
    };
  };

  const [stripeCheckout, {error, isLoading, data: checkoutData}] = useLazyStripeCheckoutQuery();

  useEffect(() => {
    if (error && 'data' in error) toast.error(error?.data?.message);
    if (checkoutData) redirect(checkoutData?.session?.url);
    
  }, [error, checkoutData])

  const bookRoom = () => {
    stripeCheckout({
      id: room?._id,
      daysOfStay,
      checkIn: dateState.checkin.toISOString(),
      checkOut: dateState.checkout.toISOString(),
      amount: daysOfStay * room?.priceNight
    })
  }

  /* const bookRoom = () => {
    const bookingData = {
      room: room?._id,
      checkIn: dateState.checkin,
      checkOut: dateState.checkout,
      daysOfStay,
      paymentInfo: {
        id: "STRIPE_ID",
        status: "PAID",
      },
    };
    newBooking(bookingData);
  }; */

  return (
    <div className='booking-card shadow p-4'>
      <p className='price-per-night'>
        <b>${room?.priceNight}</b> / night
      </p>
      <hr/>
      <p className="mt5 mb-3">Pick Check In & Check Out Dates</p>
      <RDatePicker 
        className='w-100'
        selected={dateState.checkin}
        startDate={dateState.checkin}
        endDate={dateState.checkout}
        minDate={new Date()}
        excludeDates={excludedDates}
        onChange={onChangeDates}
        selectsRange
        inline
      />
      { isAvailable ? 
      <div className="alert alert-success my-3">
        Room is available. Book now.
      </div>
      : data ? 
      <div className="alert alert-danger my-3">
        Room not available. Try different dates.
      </div> : ''
      }
      { isAvailable && !isAuth && 
      <div className="alert alert-danger my-3">
        Login to book room.
      </div>
      }
      { isAvailable && isAuth && 
      <button className="btn py-3 form-btn w-100" onClick={bookRoom} disabled={isLoading}>
        Pay - ${daysOfStay * room?.priceNight}
      </button>
      }
    </div>
  )
};

export default DatePicker;
