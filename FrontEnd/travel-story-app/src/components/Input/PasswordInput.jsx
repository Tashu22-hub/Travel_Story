import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative w-full mb-4">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <div
        className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
        onClick={togglePassword}
      >
        {isShowPassword ? (
          <FaRegEye 
          size={20} 
          className="text-current cursor-pointer" />
        ) : (
          <FaRegEyeSlash 
          size={20} 
          className="text-gray-600" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
