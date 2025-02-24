import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const Profile = () => {
    const { user } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.token) {
            console.error("No user or token found.");
            return;
        }

        const fetchUserRecipes = async () => {
            if (user) {
                try {
                    const data = await fetch(`recipes?owner=${user._id}`);
                    setRecipes(data);
                } catch (err) {
                    console.error("Failed to fetch user recipes:", err);
                }
            }
        };

        fetchUserRecipes();
    }, [user]);

    const handleAddRecipe = () => {
        console.log("Add recipe");
        try {
            navigate("/create");
        } catch (err) {
            console.error("Failed to navigate to add recipe page:", err);
        }
    };

    const handleEditRecipe = () => {
        console.log("Edit recipe");
        try {
            navigate("/edit");
        } catch (err) {
            console.error("Failed to navigate to edit recipe page:", err);
        }
    };

    const handleDeleteRecipe = async (recipeId) => {
        console.log("Delete recipe");
        try {
            const response = await fetch(`/api/recipes/${recipeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete recipe");
            }

            setRefreshTrigger(!refreshTrigger);
        } catch (err) {
            console.error("Failed to delete recipe:", err);
        }
    };

    const handleViewDetails = () => {
        console.log("View details");
        try {
            navigate("/recipes/:id");
        } catch (err) {
            console.error("Failed to navigate to view details page:", err);
        }
    };

    return (
        <div>
            <h1>My Profile</h1>
            <h2>Welcome, {user?.username}!</h2>

            <button onClick={handleAddRecipe}>Add Recipe</button>

            <div>
                <h3>My Recipes</h3>
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe._id}>
                            <h4>{recipe.recipeName}</h4>
                            <p>{recipe.cuisine}</p>
                            <p>{recipe.level}</p>

                            <div>
                                <button onClick={() => handleEditRecipe(recipe._id)}>Edit</button>
                                <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
                                <button onClick={() => handleViewDetails(recipe._id)}>View Details</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found. Add a new recipe!</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
