import React from "react";
import { MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";


const ViewTravelStory = ({onClose,onDeleteClick,onEditClick}) => {
  return (
    <div className='relative'>
      <div className="flex items-center justify-between">
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
    </div>
  );
};

export default ViewTravelStory;
