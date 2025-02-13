import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";


const ViewTravelStory = ({onClose,onDeleteClick,onEditClick}) => {
  return (
    <div className='relative'>
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
          <div className="">
            <span className="text-sm text-slate-600">
              {storyInfo && moment(storyInfo.date).format("Do MMM YYYY")}
            </span>
            <div className="">
              <GrMapLocation className="text-sm"/>
              {storyInfo && storyInfo.visitedLocation.map((item, index) => 
              storyInfo.visitedLocation.length === index + 1 ? item : `${item},`)}
            </div>  
          </div>
        </div>
    </div>
  );
};

export default ViewTravelStory;
