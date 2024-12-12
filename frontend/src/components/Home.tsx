import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { RootState } from "../redux/store";

const Home = () => {
  const [message, setMessage] = useState<string | null>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.value);
  useEffect(() => {
    (async () => {
      // setLoading(true);
      try {
        const { data } = await axios.get("user/");
        dispatch(setAuth(true));
        setMessage(`Hi ${data.first_name} ${data.last_name}`);
        
      } catch (error) {
        // setMessage("you are not logged in");
        dispatch(setAuth(false));
      }finally{
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div
      className="bg-gray-50 dark:bg-gray-900 h-screen text-center  dark:text-white justify-center 
    items-center text-4xl"
    >
      {
        loading ? <div>Loading</div>:auth ? <div>{message}</div>:<div>{"you are not authorized"}</div>
      }
    </div>
  );
};

export default Home;
