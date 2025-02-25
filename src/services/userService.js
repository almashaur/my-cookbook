const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

// Helper to get the authorization config
const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};

// Get user information and their recipes by user ID (Protected route)
const getUserRecipes = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}/recipes`, {
            method: "GET",
            headers: getAuthConfig(),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err || "Failed to fetch user and recipes");
        }

        return data;
    } catch (err) {
        console.error("Fetch User Error:", err);
        throw err;
    }
};

export {
    getUserRecipes,
};
