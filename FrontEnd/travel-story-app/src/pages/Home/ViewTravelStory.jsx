import React from "react";
import moment from "moment";
import { GrMapLocation } from "react-icons/gr";
import { MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const ViewTravelStory = ({ 
  onClose,
  onDeleteClick,
  onEditClick,
  storyInfo 
}) => {
  return (
    <div className="relative">
      {/* Action Buttons */}
      <div className="flex items-center justify-end">
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg"> 
            <button
              className="btn-small"
              onClick={onEditClick}
              aria-label="Update story"
            >
              <MdUpdate className="text-lg" />
              UPDATE STORY
            </button>
            <button
              className="btn-small btn-delete"
              onClick={onDeleteClick}
              aria-label="Delete story"
            >
              <MdDeleteOutline className="text-lg" />
              Delete
            </button>
            <button
              className=""
              onClick={onClose}
              aria-label="Close"
            >
              <MdClose className="text-lg text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="flex-1 flex flex-col gap-2 py-4">
        <h1 className="text-2xl text-slate-950">
          {storyInfo?.title}
        </h1>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
          </span>
          <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan200/40 rounded px-2 py-1">
            <GrMapLocation className="text-sm" />
            {storyInfo &&
            storyInfo.visitedLocation?.map((item, index) => 
                storyInfo.visitedLocation.length == index + 1
                ? `${item}`
                : `${item}, `
            )}
          </div>
        </div>
        <img
          src={storyInfo?.ImageUrl}
          alt={storyInfo?.title || "Travel story image"}
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </div>

      {/* Story Text */}
      <div className="mt-4">
        <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">
          {storyInfo?.story}
        </p>
      </div>
    </div>
  );
};

export default ViewTravelStory;
