import React from "react";

const ViewTravelStory = () => {
  return (
    <div className='"relative'>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            <button className="btn-small" onClick={() => {}}>
              <MdAdd className="text-lg" />
              ADD STORY
            </button>
            <button className="btn-small" onClick={() => {}}>
              <MdUpdate className="text-lg" />
              UPDATE STORY
            </button>
            <button className="" onClick={onClose}>
              <MdDeleteOutline className="text-lg" />
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
