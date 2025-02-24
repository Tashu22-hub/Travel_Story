import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'; // Navigation bar component import
import { useNavigate } from 'react-router-dom'; // Navigation hook for routing
import axiosInstance from '../../utils/axiosInstance'; // Custom Axios instance for API requests
import { MdAdd } from 'react-icons/md'; // Material Design Add Icon
import Modal from 'react-modal'; // Modal for Add/Edit travel stories
import TravelStoryCard from '../../components/Cards/TravelStoryCard'; // Card component to display each travel story
import AddEditTravelStory from './AddEditTravelStory'; // Component for adding or editing a story
import ViewTravelStory from './ViewTravelStory'; // Component for viewing a story
import { ToastContainer, toast } from 'react-toastify'; // Toast notification library
import EmptyCard from '../../components/Cards/EmptyCard';

import EmptyImg from '../../assets/images/add-story.png'; // Empty state image
import { Day } from 'react-day-picker';

const Home = () => {
    const navigate = useNavigate(); // Hook for navigating between routes
    const [userInfo, setUserInfo] = useState(null); // Holds user information
    const [allStories, setAllStories] = useState([]); // Holds all travel stories
    const [loading, setLoading] = useState(true); // Loading state for data fetching

    const[searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState(''); // Holds all travel stories
    
    const[dataRange, setDataRange] = useState( {form: null, to: null} ); // Holds all travel stories

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false, // Modal visibility state
        type: "add", // Modal type (add/edit)
        data: null, // Data to edit if modal type is "edit"
    });

    const [openViewModal, setOpenViewModal] = useState({
        isShown: false, // Modal visibility state
        data: null, // Data to view if modal type is "view"
    });
    // Fetches user information from the API
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user); // Updates the user info state
            }
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.clear(); // Clears local storage if the user is unauthorized
                navigate("/login"); // Redirects to the login page
            }
            console.error("Error fetching user info:", error);
        }
    };

    // Fetches all travel stories from the API
    const getAllTravelStories = async () => {
        try {
            const response = await axiosInstance.get("/get-all-travel-stories");
            if (response.data && response.data.travelStories) {
                setAllStories(response.data.travelStories); // Updates the state with travel stories
            }
        } catch (error) {
            console.error("An error occurred while fetching stories:", error);
        } finally {
            setLoading(false); // Stops loading spinner
        }
    };

    // Handles editing a travel story
    const handleEdit = (data) => {
        setOpenAddEditModal({ isShown: true, type: "edit", data:data }); // Opens the modal
    };

    // Handles viewing a specific travel story
    const handleViewStory = (data) => {
        setOpenViewModal({ isShown: true, data}); // Opens the view modal
        
    };

    // Updates the favorite status of a travel story
    const updateFavorite = async (storyData) => {
        try {
            const response = await axiosInstance.put(`/update-favourite/${storyData._id}`, {
                isFavourite: !storyData.isFavourite, // Toggle favorite status
            });
            if (response.data) {
                // Update local state to reflect the change
                const updatedStories = allStories.map((story) =>
                    story._id === storyData._id ? { ...story, isFavourite: !story.isFavourite } : story
                );
                setAllStories(updatedStories);
                toast.success("Story updated successfully."); // Show success message
                getAllTravelStories(); // Refresh the stories list
            }
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };
    // Deletes a travel story
    const deleteTravelStory = async (Data) => {
        const originalStories = [...allStories]; // Store the original state
    
        try {
            // Optimistically update the UI
            const updatedStories = allStories.filter(story => story._id !== Data._id);
            setAllStories(updatedStories);
    
            // Make the API call to delete the story
            const response = await axiosInstance.delete(`/delete-travel-story/${Data._id}`);
            console.log("API Response:", response); // Debugging: Log the response
    
            // Check if the deletion was successful based on the API response
            if (response.status === 200 || response.status === 204) {
                toast.success("Story deleted successfully."); // Show success message
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            } else {
                // Revert the optimistic update if the API call fails
                setAllStories(originalStories);
                toast.error("Failed to delete the story.");
            }
        } catch (error) {
            // Revert the optimistic update if the API call fails
            setAllStories(originalStories);
    
            // Handle different types of errors
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message || "Failed to delete the story.");
            } else if (error.request) {
                // The request was made but no response was received
                toast.error("No response received from the server.");
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error("An error occurred while deleting the story.");
            }
        }
    };

    //search story
    const onSearchStory = async (query) => {
        try {
            const response = await axiosInstance.get(`/search-travel-stories`, {
                params: {
                    query,
                },
            });
            if (response.data && response.data.stories) {
                setFilterType("search");
                setAllStories(response.data.stories);
            }
        } catch (error) {
            console.error("An error occurred while searching stories:", error);
        }
    };
    const handleClearSearch = () => {
        setFilterType("");
        getAllTravelStories();
    };
    
    //Handle Filter Travel Story By Date Range
    const filterStoriesByDate = async (day) => {}

    //handle Date Range Select
    const handleDayClick = (day) => {
        setDataRange(day);
        filterStoriesByDate(day);
    };

    // Fetches user info and travel stories on component mount
    useEffect(() => {
        getUserInfo();
        getAllTravelStories();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading message until data is fetched
    }

    return (
        <>
            <Navbar 
            userInfo={userInfo} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            onSearchNote={onSearchStory} 
            handleClearSearch={handleClearSearch}

            /> {/* Navbar with user info */}

            <div className="container mx-auto px-10">
                <div className="flex gap-7">
                    <div className="flex-1">
                        {allStories.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {allStories.map((item) => (
                                    <TravelStoryCard
                                        key={item._id}
                                        ImgUrl={item.ImageUrl}
                                        title={item.title}
                                        story={item.story}
                                        date={item.visitedDate}
                                        visitedLocations={item.visitedLocations}
                                        isFavorite={item.isFavourite}
                                        onEdit={() => handleEdit(item)}
                                        onClick={() => handleViewStory(item)}
                                        onFavoriteClick={() => updateFavorite(item)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyCard 
                                imgSrc = {EmptyImg}
                                message={`Start creating your first Story! Click the  "Add Story" button button to 
                                jot down your thoughts,ideas, and memories. Let's get started!`}
                            /> // Display when no stories exist
                        )}
                    </div>
                    <div className="w-[320px]">
                        <div className='bg-white border-slate-200 show-slate-200/60 rounded-lg'>
                        <div className='p-3'>
                            <DayPicker
                                captionLayout="dropdown-buttons"
                                mode="range"
                                selected={dataRange}
                                pagesNavigation
                            />
                        </div>
                    </div>
                </div>
            </div>
              
            {/* Add/Edit story modal */}
            <Modal 
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        zIndex: 999,
                    },
                }}
                appElement={document.getElementById("root")}
                className="model-box"
            >
            <AddEditTravelStory
                type={openAddEditModal.type}
                storyInfo={openAddEditModal.data}
                onClose={() => {
                  setOpenAddEditModal({ isShown: false, type: "add", data: null });
                  getAllTravelStories(); // Refresh the stories list
                }}
                 getAllTravelStories={getAllTravelStories} // Pass the function to refresh the list
               
            />
              
            </Modal>

            {/* View story modal */}
           
            <Modal 
                isOpen={openViewModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        zIndex: 999,
                    },
                }}
                appElement={document.getElementById("root")}
                className="model-box"
            >
                <ViewTravelStory storyInfo={openViewModal.data || null} 
                onClose={() => {
                    setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                }}
                onDeleteClick={() => {
                    deleteTravelStory(openViewModal.data || null);
                }}
                onEditClick={() => {
                    setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                    handleEdit(openViewModal.data || null)
                }}
                />
            </Modal>

            {/* Floating button to open Add/Edit Modal */}
            <button
               className="w-16 h-16 item-center justfy-center rounded-full bg-current hover:bg-cyan-400 fixed right-10 bottom-10"
               onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null });
               }}
            >
              <MdAdd className="icon-btn text-3xl text-white w-16 h-12 item" />
            </button> 

            <ToastContainer /> {/* Toast container for notifications */}
        </>
    );
};

export default Home;
