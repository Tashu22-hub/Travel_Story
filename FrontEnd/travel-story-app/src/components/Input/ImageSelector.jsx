import React, { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa";

const ImageSelector = ({ Image, setImage }) => {
  const inputRef = useRef(null);
  const [PreviewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (typeof Image === "string") {
      setPreviewUrl(Image);
    } else if (Image) {
      const objectUrl = URL.createObjectURL(Image);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [Image]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

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