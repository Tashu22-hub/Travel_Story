import React from "react";
import { GrMapLocation } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa';

const TravelStoryCard = ({
    ImgUrl,
    title,
    date,
    story,
    visitedLocations,
    isFavorite,
    onEdit,
    onFavoriteClick,
    onClick,
}) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
                src={ImgUrl}
                alt={title}
                className="w-full h-52 object-cover"
                onClick={onClick}
            />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 text-sm mb-2">{new Date(date).toLocaleDateString()}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">{story}</p>
                <div className="flex items-center text-gray-600 mb-4">
                    <GrMapLocation className="mr-2" />
                    <span>{visitedLocations}</span>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavoriteClick();
                        }}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FaHeart className={isFavorite ? "text-red-500" : "text-gray-500"} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TravelStoryCard;