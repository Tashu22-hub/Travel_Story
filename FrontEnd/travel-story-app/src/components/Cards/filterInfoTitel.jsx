import React from "react";
import { MdoutlineClose } from "react-icons/md";
import moment from "moment";

const filterInfoTitel = ({ filterType, filterDates, onClear }) => {
  const DateRangeChip = ({ date }) => {
    const startDate = date?.from
      ? moment(date?.from).format("DD MMM YYYY")
      : "N/A";
    const endDate = date?.to ? moment(date?.to).format("DD MMM YYYY") : "N/A";
    return (
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
        <p className="text-xs font-medium">
          {startDate} - {endDate}
        </p>
        <button onClick={onClear}>
          <MdoutlineClose />
        </button>
      </div>
    );
  };
  
  return (
    filterType && (
      <div className="mb-5">
        {filterType === "search" ? (
          <h3 className="text-lg font-semibold">Search Results</h3>
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Travel Stories from</h3>
            <DateRangeChip date={filterDates} />
          </div>
        )}
      </div>
    )
  );
};

export default filterInfoTitel;
