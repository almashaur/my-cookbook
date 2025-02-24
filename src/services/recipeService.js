const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/recipes`;

const deleteRecipe = async (recipeId, token) => {
    try {
        const res = await fetch(`${BASE_URL}/${recipeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
              throw new Error(data.err || "Failed to delete recipe");
            }
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        
        return data;
    } catch (err) {
        console.error("Error deleting recipe:", err);
        throw err;
    }
};

export default {
    deleteRecipe,
};
