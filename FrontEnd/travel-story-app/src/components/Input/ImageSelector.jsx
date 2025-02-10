import React, { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa";

// ImageSelector component allows users to select and preview an image file.
const ImageSelector = ({ Image, setImage }) => {
  const inputRef = useRef(null); // Ref to access the file input element
  const [PreviewUrl, setPreviewUrl] = useState(null); // State to store the preview URL of the selected image

  // Handles image selection from the file input
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setImage(file); // Update the parent component with the selected file
    }
  };

  // Triggers the file input dialog when the button is clicked
  const onChooseFile = () => {
    inputRef.current.click();
  };

  // Effect to generate a preview URL for the selected image
  useEffect(() => {
    if (typeof Image === "string") {
      // If the image is a URL (e.g., from an API), use it directly
      setPreviewUrl(Image);
    } else if (Image) {
      // If the image is a file, create an object URL for preview
      const objectUrl = URL.createObjectURL(Image);
      setPreviewUrl(objectUrl);

      // Cleanup function to revoke the object URL when the component unmounts or the image changes
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      // If no image is selected, clear the preview URL
      setPreviewUrl(null);
    }
  }, [Image]);

  return (
    <div>
      {/* Hidden file input element */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Display a button to choose an image if no image is selected */}
      {!Image ? (
        <button
          className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
          onClick={onChooseFile}
        >
          <div className="w-14 h-14 flex items-center justify-center bg-slate-50 rounded-full border border-cyan-100">
            <FaRegFileImage className="text-xl text-cyan-500" />
          </div>

          <p className="text-xs text-slate-500">Browse image files to upload</p>
        </button>
      ) : (
        // Display the selected image preview
        <div className="w-full relative">
          <img
            src={PreviewUrl}
            alt="Selected"
            className="w-full h-[220px] object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageSelector;