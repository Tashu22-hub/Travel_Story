import React, { useState } from 'react';
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from 'react-icons/md';
import DataSelector from '../../components/Input/DataSelector';
import { GrTarget } from 'react-icons/gr';
import ImageSelector from '../../components/Input/ImageSelector';
import TagInput from '../../components/Input/TagInput';

// AddEditTravelStory component allows users to add or update a travel story
const AddEditTravelStory = ({
    storyInfo,
    type, // Determines if the component is in "add" or "update" mode
    onClose, // Function to close the modal or form
    getAllTravelStories, // Function to fetch all travel stories after adding/updating
}) => {
    // State variables for the form fields
    const [title, setTitle] = useState('');
    const [storyImg, setStoryImg] = useState(null); // State for the story image
    const [story, setStory] = useState('');
    const [visitedLocations, setVisitedLocations] = useState([]);
    const [visitedDate, setVisitedDate] = useState(null);

    // Handles the add or update action
    const handleAddOrUpdateClick = () => {
        getAllTravelStories(); // Fetch all stories after adding/updating
    };
    //Delete story image and update the story
    const handleDeleteStoryImg = () => {
        setStoryImg(null);
    };
    return (
        <div>
            {/* Header section with title and action buttons */}
            <div className="flex justify-between items-center">
                <h5 className="text-xl font-semibold text-slate-700">
                    {type === "add" ? "Add Story" : "Update Story"}
                </h5>
                <div>
                    <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
                        {/* Display "ADD STORY" button in "add" mode */}
                        {type === "add" ? (
                            <button className="btn-small" onClick={handleAddOrUpdateClick}>
                                <MdAdd className="text-lg" />ADD STORY
                            </button>
                        ) : (
                            // Display "UPDATE STORY" and "DELETE" buttons in "update" mode
                            <>
                                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                                    <MdUpdate className="text-lg" />UPDATE STORY
                                </button>

                                <button className="btn-small btn-delete" onClick={onClose}>
                                    <MdDeleteOutline className="text-lg" />DELETE
                                </button>
                            </>
                        )}

                        {/* Close button to exit the form */}
                        <button onClick={onClose}>
                            <MdClose className="text-xl text-slate-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Form fields for the travel story */}
            <div>
                <div className="flex-1 flex flex-col gap-2 pt-4">
                    {/* Title input field */}
                    <label className="input-label">TITLE</label>
                    <br />
                    <input
                        type="text"
                        className="text-2xl text-slate-950 outline-none"
                        placeholder="A day at the Great Wall"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />

                    {/* Date selector for the visited date */}
                    <div className="my-3">
                        <DataSelector date={visitedDate} setDate={setVisitedDate} />
                    </div>

                    {/* Image selector for the story image */}
                    <ImageSelector
                        Image={storyImg}
                        setImage={setStoryImg}
                        handleDeleteImg={handleDeleteStoryImg}
                    />

                    {/* Textarea for the story content */}
                    <div className="flex flex-col gap-2 mt-4">
                        <label className="input-label">STORY</label>
                        <textarea
                            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                            placeholder="Write your story here..."
                            rows={10}
                            value={story}
                            onChange={({ target }) => setStory(target.value)}
                        />
                    </div>

                    <div className="pt-3">
                      <label className="input-label">VISITED LOCATIONS</label>
                      <TagInput tags={visitedLocations} setTags={setVisitedLocations} />
                    </div>
            </div>
          </div>
        </div>
    );
};

export default AddEditTravelStory;