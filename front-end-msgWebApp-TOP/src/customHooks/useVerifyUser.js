import { useState, useEffect } from "react";

const useVerifyUser = (token) => {
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      const baseUrl = "http://localhost:5000/auth/verify-user";
      const fetchData = async () => {
        try {
          const response = await fetch(baseUrl, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = await response.json();
          if (response.ok) {
            setVerifiedUser(userData.user);
            setLoading(false);
          } else{
            setError("verification failed")
          }
        } catch (error) {
            if(error.name === 'TypeError') {
                setError("The server is currently unavailable. Please try again later")
            }
            setError("Network error please try later")
            
            setLoading(false)
        }
      };
    }
  },[token]);

  return { verifiedUser, loading, error}
};

export default useVerifyUser