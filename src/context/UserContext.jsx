import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.payload; // Adjust based on your token structure
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  // Automatically log out if token is expired
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Token expired, logging out...");
        logoutUser();
      }
    }
  }, [user]);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = { user, setUser, logoutUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
