import React from "react";
import moment from "moment";
import { GrMapLocation } from "react-icons/gr";
import { MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const ViewTravelStory = ({ onClose, onDeleteClick, onEditClick, storyInfo }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            <button className="btn-small" onClick={onEditClick}>
              <MdUpdate className="text-lg" />
              UPDATE STORY
            </button>
            <button className="btn-small" onClick={onDeleteClick}>
              <MdDeleteOutline className="text-lg" />
              Delete
            </button>
            <button className="" onClick={onClose}>
              <MdClose className="text-lg text-slate-400" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 py-4">
        <h1 className="text-2xl text-slate-950">
          {storyInfo && storyInfo.title}
        </h1>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
          </span>
          <div className="inline-flex items-center gap-2 text-[13px] text-cyan-200/40 rounded-full px-2 py-1">
            <GrMapLocation className="text-sm" />
            {storyInfo &&
              storyInfo.visitedLocation.map((item, index) =>
                storyInfo.visitedLocation.length === index + 1
                  ? `${item}`
                  : `${item},`
              )}
          </div>
        </div>
        <img 
            src={storyInfo && storyInfo.imageUrl}
            alt="selected"
            className="w-16 h-16 object-cover rounded-lg"
          />
      </div>
    </div>
  );
};

export default ViewTravelStory;