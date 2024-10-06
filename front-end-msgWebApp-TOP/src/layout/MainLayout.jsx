import { Outlet, useNavigate } from "react-router-dom";

import { useState, useEffect, createContext } from "react";

// component imports
import Navbar from "../components/Navbar";

export const AuthContext = createContext({
  token: null,
  user: {
    userId: "",
    name: "",
    profilePic: "",
    isAuthenticated: false,
  },
  userLoading: true,
  userError: null,
});

const MainLayout = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [user, setUser] = useState({
    userId: "",
    name: "",
    profilePic: "",
    isAuthenticated: false,
  });
  const [userError, setUserError] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const getUserName = async (token) => {
    if (token) {
      setUserLoading(true);
      try {
        const baseUrl = "http://localhost:5000/auth/verify-user";
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await response.json();
        if (response.ok) {
          setUser({
            userId: userData.user.id,
            name: userData.user.name,
            profilePic: userData.user.profilePic,
            isAuthenticated: true,
          });
          setUserLoading(false);
        } else {
          console.log("failed to authenticate");
          setUserError("verification failed");
          setUserLoading(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        if (error.name === "TypeError") {
          setUserError(
            "The server is currently unavailable. Please try again later"
          );
        } else {
          setUserError("Network error please try later");
        }
        localStorage.removeItem("token");
        setUserLoading(false);
      }
    }
  };

  const handleLogOut = () => {
    setUser({
      userId: "",
      name: "",
      profilePic: "",
      isAuthenticated: false,
    });
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      getUserName(token);
    }
  }, [token]);

  return (
    <div className="grid grid-rows-pageLayout min-h-screen">
      <AuthContext.Provider
        value={{ token, setToken, user, userLoading, userError }}
      >
        <Navbar handleLogOut={handleLogOut} />
          <div className="h-full ">
            <Outlet />
          </div>
        <p>Footer</p>
      </AuthContext.Provider>
    </div>
  );
};

export default MainLayout;
