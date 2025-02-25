import { useState, useEffect } from "react";
import { getRecipeById } from "../../../services/recipeService";
import { useParams } from "react-router";

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const [recipeData, setRecipeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipe = await getRecipeById(recipeId);
                console.log(recipe)
                setRecipeData(recipe);
            } catch (error) {
                setError("Failed to fetch recipe.");
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        if (recipeId) {
            fetchRecipe();
        }
    }, [recipeId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!recipeData) return <div>No recipe found.</div>;


    return (
        <div>

            <h1>{recipeData.recipeName}</h1>
            {/* <h3>{recipeData.owner}</h3>  */}
            {/* to be updated  */}
            <img
                src={recipeData.image || "example.png"}
                className="card-img-top"
                alt={recipeData.name}
                style={{ height: "300px", objectFit: "cover" }}
                />
                <p><h2>Cuisine: </h2>{recipeData.cuisine}</p>
                <p><h2>Level: </h2>{recipeData.level}</p>
            <div className="col-md-6">
                <h2>Ingredients</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Ingredients</th>
                            <th>Amounts</th>
                            <th>Alternatives</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeData.ingredients.map((ingredient, index) => (
                            <tr key={index}>
                                <td>{ingredient.ingredientName}</td>
                                <td>{ingredient.amount}</td>
                                <td>{ingredient.alternatives}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Tools</h2>
                <ul>
                {recipeData.tools.map((tool)=>(
                    <li key={tool}>{tool}</li>
                ))}
                </ul>
            </div>
            <div>
                <h2>Instructions</h2>
                <h4>
                {recipeData.instructions}</h4>
                
            </div>

        </div>
    );
}





export default RecipeDetails;