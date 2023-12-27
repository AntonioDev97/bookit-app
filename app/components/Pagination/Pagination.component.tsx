'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import ReactPagination from 'react-js-pagination';

interface Props {
    resPerPage: number,
    totalFound: number
};

const Pagination = ({ resPerPage, totalFound }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    let page = Number(searchParams.get("page") || 1);

    let queryParams;
    const handlePageChange = (currentPage: string) => {
      if (typeof window !== "undefined") {
        queryParams = new URLSearchParams(window.location.search);
        queryParams.has("page") ? queryParams.set("page", currentPage) : queryParams.append("page", currentPage);
  
        const path = `${window.location.pathname}?${queryParams.toString()}`;
        router.push(path);
      }
    };
    return (
      <div>
        {resPerPage < totalFound && (
          <div className="d-flex justify-content-center mt-5">
            <ReactPagination
              activePage={page}
              itemsCountPerPage={resPerPage}
              totalItemsCount={totalFound}
              onChange={handlePageChange}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        )}
      </div>
    );
};

export default Pagination;
