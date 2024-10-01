import { Outlet, useNavigate } from "react-router-dom";

import { useState, useEffect, createContext } from "react";

// component imports
import Navbar from "../components/Navbar";

// custom hook import
import useVerifyUser from "../customHooks/useVerifyUser";

export const AuthContext = createContext();

const MainLayout = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const {verifiedUser, loading, error} = useVerifyUser(token)

  const [user, setUser] = useState({
    userId: "",
    name: "",
    profilePic: "",
    isAuthenticated: false,
  });

  useEffect(()=>{
    if(verifiedUser){
      setUser({
        userId: verifiedUser.id,
        name: verifiedUser.name,
        profilePic: verifiedUser.profilePic,
        isAuthenticated: true
      })
      localStorage.setItem("token", token)
    }else {
      setUser({
        userId: "",
        name: "",
        profilePic: "",
        isAuthenticated: false
      })
      localStorage.removeItem("token")
      navigate("/")
    }

  },[token])




  return (
    <div className="grid grid-rows-pageLayout min-h-screen">
      <AuthContext.Provider value={{ token, setToken, user }}>
      <Navbar />
      <Outlet />
      <p>Footer</p>
      </AuthContext.Provider >
    </div>
  );
};

export default MainLayout;
