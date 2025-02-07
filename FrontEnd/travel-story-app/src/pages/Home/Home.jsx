import React from 'react'
import Navbar from '../../components/Navbar';
import { use } from 'react';
const Home = () => {

  const navigate = useNavigate();

  const [userinfo,setUserinfo] = useState(null);
  
  //Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        //Set user info in state
        setUserinfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        //clear storage if unauthorized
        localStorage.clear();
        navigate("/login");//Redirect to login page
        setError(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
       <Navbar />
    </div>
  )
}

export default Home
