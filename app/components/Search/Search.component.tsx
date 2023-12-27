"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {

  const [searchState, setSearchState] = useState({ location: '', guests: 0, category: '' });
  const router = useRouter();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryString = [
      searchState.location && `location=${encodeURIComponent(searchState.location)}`,
      searchState.guests && `guestCapacity=${encodeURIComponent(searchState.guests)}`,
      searchState.category && `category=${encodeURIComponent(searchState.category)}`,
    ]
      .filter(Boolean)
      .join("&");

    router.push(`/?${queryString}`);
  };

  return (
    <div className="row wrapper mt-5">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded" onSubmit={submitHandler}>
          <h2 className="mb-3">Search Rooms</h2>
          <div className="form-group mt-3">
            <label htmlFor="location_field" className="mb-1">
              {" "}
              Location{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="location_field"
              placeholder="new york"
              value={searchState.location}
              onChange={(e) => setSearchState(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="guest_field" className="mb-1">
              {" "}
              No. of Guests{" "}
            </label>
            <select
              className="form-select"
              id="guest_field"
              value={searchState.guests}
              onChange={(e) => setSearchState(prev => ({ ...prev, guests: Number(e.target.value) }))}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="room_type_field" className="mb-1">
              {" "}
              Room Type{" "}
            </label>
            <select
              className="form-select"
              id="room_type_field"
              value={searchState.category}
              onChange={(e) => setSearchState(prev => ({ ...prev, category: e.target.value }))}
            >
              {["King", "Single", "Twins"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn form-btn w-100 py-2">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;