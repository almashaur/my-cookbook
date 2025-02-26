
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {  getRecipeById } from '../../../../services/recipeService';
import { Link } from "react-router-dom";
import AddRecipeForm from '../AddRecipe/AddRecipe'
import { UserContext } from '../../../../context/UserContext';
const EditRecipePage = () => {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { user} = useContext(UserContext)
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const fetchedRecipe = await getRecipeById(recipeId);
                fetchRecipe.owner= user.username;
                console.log(fetchedRecipe)
                setRecipeData(fetchedRecipe);
            } catch (error) {
               setMessage("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        };
        if (recipeId) {
            fetchRecipe();
        }
    }, [recipeId]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            {recipeData ? (
                <AddRecipeForm recipe={recipeData} navigate={navigate} /> 
            ) : (
                <div>Error: Recipe not found.</div>
            )}

            {/* <AddRecipeForm recipe={recipe} navigate={navigate} />  */}
        </div>
    );
};

export default EditRecipePage;