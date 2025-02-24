const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const updateUser = async (userId, userData, token) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err || "Failed to update user");
        }

        return data;
    } catch (err) {
        console.error("Error updating user:", err);
        throw err;
    }
};

const deleteUser = async (userId, token) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err || "Failed to delete user");
        }

        return data;
    } catch (err) {
        console.error("Error deleting user:", err);
        throw err;
    }
};

export default {
    updateUser,
    deleteUser,
};
