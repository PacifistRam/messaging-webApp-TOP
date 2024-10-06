import { useEffect, useState } from "react";

const useAllUsers = (token) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = `http://localhost:5000/msg/all-users`;

    const options = {
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(baseUrl, options);
        const allUsersData = await response.json();
        if (response.ok) {
          setAllUsers(allUsersData.users);
        } else {
          setError(
            allUsersData.message || "error occurred while fetching chats"
          );
        }
      } catch (error) {
        if (error.name === "TypeError") {
          setError(
            "The server is currently unavailable. Please try again later"
          );
        } else {
          setError("server error please try later");
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchAllUsers();
    }
  }, [token]);

  return { allUsers, loading, error };
};

export default useAllUsers;
