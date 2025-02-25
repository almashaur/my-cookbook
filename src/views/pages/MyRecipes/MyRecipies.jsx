import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { getUserRecipes } from "../../../services/userService";

const MyRecipes = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    if (!user || !user.token) {
      console.error("No user or token found.");
      return;
    }
    const fetchUserRecipes = async () => {
      if (user) {
        try {
          const data = await getUserRecipes(user._id);
          setUserData(data);
        } catch (err) {
          console.error("Failed to fetch user recipes:", err);
        }
      }
    };
    fetchUserRecipes();
  }, [user]);

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
      const data = await getUserRecipes(user._id);
      setUserData(data);
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  };

  return (
    <div>
      <h1>My Profile</h1>
      <h2>{user?.username} Recipes!</h2>
      <h3>for id {user._id}</h3>
      <div>
        <h3>My Recipes</h3>
        {userData?.recipes?.length > 0 ? (
          userData.recipes.map((recipe) => (
            <div key={recipe._id}>
              <h4>{recipe.recipeName}</h4>
              <p>{recipe.cuisine}</p>
              <p>{recipe.level}</p>
              <div>
                <Link to={`/recipes/${recipe._id}`}>
                  <button>View Details</button>
                </Link>
                <Link to={`edit/${recipe._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
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

export default MyRecipes;
