import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import TravelStoryCard from '../../components/Cards/TravelStoryCard';

import { ToastContainer, toast } from 'react-toastify';// Import toastify module
const Home = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [allStories, setAllStories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get user info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
            console.error("Error fetching user info:", error);
        }
    };

    // Get all travel stories
    const getAllTravelStories = async () => {
        try {
            const response = await axiosInstance.get("/get-all-travel-stories");
            if (response.data && response.data.travelStories) {
                setAllStories(response.data.travelStories);
            }
        } catch (error) {
            console.error("An error occurred while fetching stories:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit story
    const handleEdit = (data) => {
        // Implement edit functionality
        console.log("Edit story:", data);
    };

    // Handle travel story Click
    const handleViewStory = (data) => {
        // Implement view story functionality
        console.log("View story:", data);
    };

    // Handle Update Favorite status
    const updateFavorite = async (storyData) => {
        try {
            const response = await axiosInstance.put(`/update-favourite/${storyData._id}`, {
                isFavourite: !storyData.isFavourite,
            });
            if (response.data) {
                // Update the local state to reflect the change
                const updatedStories = allStories.map((story) =>
                    story._id === storyData._id ? { ...story, isFavourite: !story.isFavourite } : story
                );
                setAllStories(updatedStories);
                toast.success("story updated successfully.");// Show success message
                getAllTravelStories();
            }
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    useEffect(() => {
        getUserInfo();
        getAllTravelStories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar userInfo={userInfo} />

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
                            <div>No stories available.</div>
                        )}
                    </div>
                    <div className="w-[320px]">
                        {/* Additional content can go here */}
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Toast container */}
        </>
    );
};

export default Home;