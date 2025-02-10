import React from 'react'
import { MdAdd,MdDeleteOutline,MdUpdate,MdClose } from 'react-icons/md'
import DataSelector from '../../components/Input/DataSelector'

const AddEditTravelStory = ({
    storyInfo,
    type,
    onClose,
    getAllTravelStories,

}) => {
    const handleAddOrUpdateClick = () => {
        getAllTravelStories();
    }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-semibold text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg ">
            {type === "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
              <MdAdd className="text-lg "/>ADD STORY
            </button> 
            ):(
            <>
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <MdUpdate className="text-lg"/>UPDATE STORY
              </button>

              <button className="btn-small btn-delete" onClick={onClose}>
                <MdDeleteOutline className="text-lg"/>DELETE
              </button>
            </>
            )}

            <button 
             className="" 
             onClick={onclose}
             >
              <MdClose className="text-xl" text-slate-400 />
            </button>

          </div>

        </div>
        
      
      </div>

      <div>
      <div className='flex-1 lex flex-col gap-2 pt-4'>
        <label className='input-label'>TITLE</label>
        <br/>
        <input 
          type='text' 
          className='text-2xl text-slate-950 outline-none' 
          placeholder='A day at the Great Wall' />
          
        <div className='my-3'>
          <DataSelector />
        </div>
      </div>
      </div>

    </div>
  )
}

export default AddEditTravelStory
