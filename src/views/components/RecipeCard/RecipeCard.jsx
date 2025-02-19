import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RecipeCard = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const fetchedRecipe = await fetch(`/api/recipes/${id}`);
                if (!fetchedRecipe.ok) throw new Error('Failed to fetch recipe');
                const data = await fetchedRecipe.json();
                setRecipe(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="recipe-detail-container">
            <h1>{recipe.recipeName}</h1>
            <img src={recipe.image[0]} alt={recipe.recipeName} style={{ width: '300px' }} />
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Level:</strong> {recipe.level}</p>
            <p><strong>Serves:</strong> {recipe.serves.join(', ')}</p>
            <h2>Ingredients:</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.amount} {ingredient.ingredientName} (Alternatives: {ingredient.alternatives.join(', ')})</li>
                ))}
            </ul>
            <h2>Instructions:</h2>
            <ol>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
            <h2>Tools Required:</h2>
            <p>{recipe.tools.join(', ')}</p>
        </div>
    );
};

export default RecipeCard;
