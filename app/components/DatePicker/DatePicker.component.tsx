import React, { useState } from 'react';
import { IRoom } from '@/backend/models/room.model';
import RDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { calculateDaysOfStay } from '@/helpers/date.helper';
import { useNewBookingMutation } from '@/redux/api/booking.api';

interface IProps { room: IRoom }

const DatePicker = ({ room }: IProps) => {
  const [dateState, setDateState] = useState({ checkin: new Date(), checkout: new Date() });
  const daysOfStay = calculateDaysOfStay(dateState.checkin, dateState.checkout);
  const onChangeDates = (dates: any[]) => {
    const [checkin, checkout] = dates;
    setDateState(prev => ({ ...prev, checkin, checkout }));
    if (checkin && checkout) console.log(checkin, checkout);
  };

  const [newBooking] = useNewBookingMutation();
  const bookRoom = () => {
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
  };

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
        onChange={onChangeDates}
        selectsRange
        inline
      />
      <button className="btn py-3 form-btn w-100" onClick={bookRoom}>
        Pay
      </button>
    </div>
  )
};

export default DatePicker;
