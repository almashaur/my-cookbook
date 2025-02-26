import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "../../../../services/recipeService";
import { UserContext } from "../../../../context/UserContext";
import AddRecipeForm from "../AddRecipe/AddRecipe";

const EditRecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await getRecipeById(recipeId);
        setRecipeData(fetchedRecipe);
      } catch (error) {
        setMessage("Error fetching recipe");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!recipeData) {
    return (
      <div className="container my-5 text-center">
        <p>Error: Recipe not found.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <AddRecipeForm recipe={recipeData} />
    </div>
  );
};

export default EditRecipePage;
