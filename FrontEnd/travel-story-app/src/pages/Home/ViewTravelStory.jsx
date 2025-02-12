import React from "react";
import { MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const ViewTravelStory = ({ onClose, onUpdate, onDelete }) => {
  return (
    <div className='relative'>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            <button aria-label="Update Story" className="btn-small" onClick={onUpdate}>
              <MdUpdate className="text-lg" />
              UPDATE STORY
            </button>
            <button aria-label="Delete" className="btn-small" onClick={onDelete}>
              <MdDeleteOutline className="text-lg" />
              Delete
            </button>
            <button aria-label="Close" onClick={onClose}>
              <MdClose className="text-lg text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;