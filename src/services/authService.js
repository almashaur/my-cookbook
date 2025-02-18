import { jwtDecode } from "jwt-decode";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || "Failed to register");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      try {
        return jwtDecode(data.token); // Decode safely
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.error("Signup Error:", err);
    throw err;
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || "Failed to log in");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      try {
        return jwtDecode(data.token);
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.error("Sign-in Error:", err);
    throw err;
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export { signUp, signIn, logout };
