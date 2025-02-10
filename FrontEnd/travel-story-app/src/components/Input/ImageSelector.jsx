import React,{useEffect, useRef,useState} from 'react'
import { FaRegFileImage } from 'react-icons/fa';


const ImageSelector = ({Image,setImage}) => {
  const ImageRef = useRef(null);
  const [PreviewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
     const file = event.target.files[0];
     if(file){
        setImage(file);
     }
  };

  const onChooseFile= () => {
    ImageRef.current.click();
  };

  useEffect(() => {
    // If the image prop is a string (URL), set is as the preview URL
    if (typeof Image === 'string') {
        setPreviewUrl(Image);
    }else if(Image){
        //if the image prop is a file object, create a URL for the file and set it as the preview URL
        setPreviewUrl(URL.createObjectURL(Image));
    }else{
        //If the image prop is null, set the preview URL to null
        setPreviewUrl(null);
    }
    return () => {
        if (PreviewUrl && typeof PreviewUrl === 'string' && !Image) {
            // Revoke the URL object when the component is unmounted
            URL.revokeObjectURL(PreviewUrl);
        }
    };
  }, [Image]);
  
  return (
    <div>
      <input 
      type="file" 
      accept="image/*" 
      ref={ImageRef} 
      onChange={handleImageChange} 
      className='hidden' 
      />

      {!Image ? (
        <button 
        className='w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50' 
        onClick={()=> onChooseFile()}
     >
        <div className='w-14 h-14 flex item-center justify-center bg-slate-50 rounded-full border border-cyan-100'>
            <FaRegFileImage className='text-xl text-cyan-500' />
        </div>

        <p className='text-xs text-slate-500'>Browse image files to upload</p>
      </button>
        ) : (
        <div className='w-full reletive'>
            <img 
            src={PreviewUrl} 
            alt='Selected' 
            className='w-full h-full object-cover rounde-lg'
             />
        </div>
        )}

    </div>
  );
};

export default ImageSelector
