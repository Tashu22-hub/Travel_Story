import React,{useRef,useState} from 'react'
import { FaRegFileImage } from 'react-icons/fa';
import { MdDeleteOutline} from 'react-icons/md';

const ImageSelector = ({Image,setImage}) => {
  const imageRef = useRef(null);
  
  const [PreviewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = () => {};
    
  return (
    <div>
      <input 
      type="file" 
      accept="image/*" 
      ref={imageRef} 
      onChange={handleImageChange} 
      className='hidden' 
      />

      <button className='' onClick={()=>{}}>
        <div className=''>
            <FaRegFileImage className='text-xl text-cyan-500' />
        </div>

        <p className='text-xs text-slate-500'>Browse image files to upload</p>
      </button>

    </div>
  );
};

export default ImageSelector
