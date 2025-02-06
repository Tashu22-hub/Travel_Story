import React from 'react';

const PasswordInput = ({ value, onChange, placeholder }) => {
  return (
    <div className='flex items-center rounded-md-3'>
      <input 
        type="password" // Set the input type to password
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  )
}

export default PasswordInput;
