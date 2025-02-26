import React, { useState, useEffect } from "react";
import { getRecipeById } from "../../../services/recipeService";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipe = await getRecipeById(recipeId);
        setRecipeData(recipe);
      } catch (err) {
        setError("Failed to fetch recipe.");
        console.error(err);
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
      <div className="container my-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <p>{error}</p>
      </div>
    );
  }

  if (!recipeData) {
    return (
      <div className="container my-5">
        <p>No recipe found.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Top Section: Image & Basic Details */}
      <div className="row">
        {/* Recipe Image */}
        <div className="col-md-6">
          <div className="card shadow">
            <img
              src={recipeData.image || "example.png"}
              className="card-img-top"
              alt={recipeData.recipeName}
              style={{ height: "350px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Recipe Details */}
        <div className="col-md-6">
          <h1 className="display-4">{recipeData.recipeName}</h1>
          <p className="lead">
            <strong>Cuisine:</strong> {recipeData.cuisine}
          </p>
          <p className="lead">
            <strong>Level:</strong>{" "}
            {recipeData.level.charAt(0).toUpperCase() +
              recipeData.level.slice(1)}
          </p>
          <p className="lead">
            <strong>Serves:</strong> {recipeData.serves}
          </p>
          <div className="mb-3">
            <h4>Tools</h4>
            {recipeData.tools && recipeData.tools.length > 0 ? (
              recipeData.tools.map((tool, index) => (
                <span key={index} className="badge bg-secondary me-2">
                  {tool}
                </span>
              ))
            ) : (
              <p>No tools specified.</p>
            )}
          </div>
          <div className="mb-3">
            <h4>Ingredients</h4>
            <ul className="list-group">
              {recipeData.ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item">
                  <strong>{ingredient.ingredientName}</strong>:{" "}
                  {ingredient.amount}
                  {ingredient.alternatives &&
                    ingredient.alternatives.length > 0 && (
                      <span className="text-muted">
                        {" "}
                        (Alternatives: {ingredient.alternatives.join(", ")})
                      </span>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="row mt-4">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <h2>Instructions</h2>
              <p className="card-text">{recipeData.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
