import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipes = await fetch(`/recipes/${id}`);
        if (!fetchedRecipes.ok) throw new Error('Failed to fetch recipes');
        const data = await fetchedRecipes.json();
        setRecipe(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.recipeName}</h1>
      <img src={recipe.image} alt={recipe.recipeName} style={{ maxWidth: "100%", height: "auto" }} />

      <p>Cuisine: {recipe.cuisine}</p>
      <p>Level: {recipe.level}</p>
      <p>Serves: {recipe.serves}</p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.ingredientName}: {ingredient.amount}
            {ingredient.alternatives.length > 0 && (
              <span> (Alternatives: {ingredient.alternatives.join(", ")})</span>
            )}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>

      <h2>Tools</h2>
      <ul>
        {recipe.tools.map((tool, index) => (
          <li key={index}>{tool}</li>
        ))}
      </ul>

    </div>
  );
};

export default RecipeDetails;
