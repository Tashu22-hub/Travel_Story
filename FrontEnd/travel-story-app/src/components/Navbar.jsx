import React from 'react';
import { useNavigate } from 'react-router-dom';
import LOGO from '../assets/logo.png';
import ProfileInfo from './Cards/ProfileInfo';
import SearchBar from './Input/SearchBar'; // Search bar component

const Navbar = ({ userInfo ,searchQuery, setSearchQuery , onSearchNote , handleClearSearch
}) => {
  const isToken = localStorage.getItem("token"); // Check for token in local storage
  const navigate = useNavigate(); // Initialize navigation hook

  // Logout handler
  const onLogout = () => {
    localStorage.clear(); // Clear all data from local storage
    navigate("/login"); // Redirect to the login page
  };

  //handle searching values  or queries to fetch the story 
  const handleSearch =() =>{ 
    if(searchQuery){
      onSearchNote(searchQuery);
    }
  }
  const onClearSearch =() =>{
    handleClearSearch();
    setSearchQuery("");
  }
  return (
    <div className=" flex items-center justify-between px-6 py-2 mb-5 drop-shadow sticky top-0 z-10 bg-primary  border-slate-200 shadow-lg shadow-slate-700 bg-cyan-400 ">
      {/* Logo */}
      <p className="font-bold text-2xl text-slate-700">MemoTrail</p>

      {/* Profile Information or Login Button */}
      {isToken &&  (
        <>
        <SearchBar value={searchQuery}
        onChange = {({target}) =>{
          setSearchQuery(target.value);
        }}
        handleSearch = {handleSearch}
        onClearSearch ={onClearSearch}
        /> 
        <ProfileInfo userInfo={userInfo || {}} onLogout={onLogout} />
        {" "}
     </>
      )}

    </div>
  );
};

export default Navbar;