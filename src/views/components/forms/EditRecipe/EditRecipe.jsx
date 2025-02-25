
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getRecipeById } from '../../../../services/recipeService';
import { Link } from "react-router-dom";
import AddRecipeForm from '../AddRecipe/AddRecipe'
const EditRecipePage = () => {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const fetchedRecipe = await getRecipeById(recipeId);
                console.log(fetchRecipe)
                setRecipeData(fetchedRecipe);
            } catch (error) {
                setMessage("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipeData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* {recipeData ? (
                <AddRecipeForm recipe={recipeData} navigate={navigate} /> // Pass recipe and navigate as props
            ) : (
                <div>Error: Recipe not found.</div>
            )} */}

            <div>
                <h1>Edit Recipe</h1>
                {recipeData && (
                    <AddRecipeForm recipeId={recipeId} initialData={recipeData} />
                )}
            </div>

            {/* <EditRecipeForm recipe={recipeData} navigate={navigate} />  */}
        </div>
    );
};

export default EditRecipePage;