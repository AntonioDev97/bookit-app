"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesStats from "../SalesStats";
import SalesChart from "../Charts/Sales";
import TopPerformingChart from "../Charts/TopPerforming";
import { useLazyGetSalesStatsQuery } from "@/redux/api/booking.api";
import { toast } from "react-hot-toast";
import Loading from "@/app/admin/loading";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState({ startDate: new Date(), endDate: new Date() });
    const [getSalesStats, { error, data, isFetching }] = useLazyGetSalesStatsQuery();

    useEffect(() => {
        if (error && "data" in error) toast.error(error?.data?.message);
        if (dashboard.startDate && dashboard.endDate && !data) {
            getSalesStats({
                startDate: dashboard.startDate.toISOString(),
                endDate: dashboard.endDate.toISOString(),
            });
        }
    }, [error]);

    const submitHandler = () => {
        getSalesStats({
            startDate: dashboard.startDate.toISOString(),
            endDate: dashboard.endDate.toISOString(),
        });
    };

    if (!data) return <Loading />;

    return (
        <div className="ps-4 my-5">
            <div className="d-flex justify-content-start align-items-center">
                <div className="mb-3 me-4">
                    <label className="form-label d-block">Start Date</label>
                    <DatePicker
                        selected={dashboard.startDate}
                        onChange={(date: any) => setDashboard(prev => ({ ...prev, startDate: date }))}
                        selectsStart
                        startDate={dashboard.startDate}
                        endDate={dashboard.endDate}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label d-block">End Date</label>
                    <DatePicker
                        selected={dashboard.endDate}
                        onChange={(date: any) => setDashboard(prev => ({ ...prev, endDate: date }))}
                        selectsEnd
                        startDate={dashboard.startDate}
                        endDate={dashboard.endDate}
                        minDate={dashboard.startDate}
                        className="form-control"
                    />
                </div>

                <button className='btn form-btn ms-4 mt-3 px-5' onClick={submitHandler} disabled={isFetching}>
                    Fetch
                </button>
            </div>
            <SalesStats data={data} />
            <div className="row">
                <div className="col-12 col-lg-8">
                    <h4 className="my-5 text-center">Sales History</h4>
                    <SalesChart salesData={data?.sixMonthSalesData} />
                </div>

                <div className="col-12 col-lg-4 text-center">
                    <h4 className="my-5">Top Performing Rooms</h4>
                    {data?.topRooms?.length > 0 ? (
                        <TopPerformingChart rooms={data?.topRooms} />
                    ) : (
                        <p className="mt-5">No data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;