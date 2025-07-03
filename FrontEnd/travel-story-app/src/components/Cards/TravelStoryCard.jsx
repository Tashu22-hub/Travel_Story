import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import moment from "moment";

const TravelStoryCard = ({
  ImgUrl,
  title,
  date,
  story,
  visitedLocations = [],
  isFavorite,
  onFavoriteClick,
  onClick,
}) => { 
  return (
    <div className="mt-5 shadow-md rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={ImgUrl}
        alt={title}
        className="w-full h-56 object-cover rounded-t-lg"
        onClick={onClick}
      />
      <button
        className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4"
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteClick();
        }}
      >
        <FaHeart
          className={`icon-btn ${isFavorite ? "text-red-500" : "text-white"}`}
        />
      </button>

      <div className="p-4" onClick={onClick}>
        <div className="flex items-center grp-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {date ? moment(date).format("DD MMM YYYY") : "-"}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-2">{story?.slice(0, 60)}</p>
        {visitedLocations.length > 0 && (
          <div className="inline-flex items-center gap-2 text-xs text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1">
            <GrMapLocation className="text-sm" />
            {visitedLocations.map((location, index) => (
              <span key={index}>
                {location}
                {index < visitedLocations.length - 1 && ","}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelStoryCard;
