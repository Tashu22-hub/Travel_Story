import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'; // Navigation bar component import
import { useNavigate } from 'react-router-dom'; // Navigation hook for routing
import axiosInstance from '../../utils/axiosInstance'; // Custom Axios instance for API requests
import { MdAdd } from 'react-icons/md'; // Material Design Add Icon
import Modal from 'react-modal'; // Modal for Add/Edit travel stories
import TravelStoryCard from '../../components/Cards/TravelStoryCard'; // Card component to display each travel story
import AddEditTravelStory from '../../components/Cards/AddEditTravelStory'; // Component for adding or editing a story

import { ToastContainer, toast } from 'react-toastify'; // Toast notification library

const Home = () => {
    const navigate = useNavigate(); // Hook for navigating between routes
    const [userInfo, setUserInfo] = useState(null); // Holds user information
    const [allStories, setAllStories] = useState([]); // Holds all travel stories
    const [loading, setLoading] = useState(true); // Loading state for data fetching

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false, // Modal visibility state
        type: "add", // Modal type (add/edit)
        data: null, // Data to edit if modal type is "edit"
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
        console.log("Edit story:", data); // Placeholder for editing functionality
    };

    // Handles viewing a specific travel story
    const handleViewStory = (data) => {
        console.log("View story:", data); // Placeholder for view story logic
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
            <Navbar userInfo={userInfo} /> {/* Navbar with user info */}

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
                            <div>No stories available.</div> // Display when no stories exist
                        )}
                    </div>
                    <div className="w-[320px]">
                        {/* Additional content can go here */}
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
                }}
                getAllTravelStories={getAllTravelStories}
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
