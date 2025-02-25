
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {  getRecipeById } from '../../../../services/recipeService';
import { Link } from "react-router-dom";
import AddRecipeForm from '../AddRecipe/AddRecipe'
const EditRecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // useEffect(() => {
    //     const fetchRecipe = async () => {
    //         try {
    //             const fetchedRecipe = await getRecipeById(id);
    //             setRecipe(fetchedRecipe);
    //         } catch (error) {
    //            setMessage("Error fetching recipe:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchRecipe();
    // }, [id]);

    // if (loading) {
    //     return <div>Loading...</div>; 
    // }

    return (
        <div>
            {/* {recipe ? (
                <AddRecipeForm recipe={recipe} navigate={navigate} /> // Pass recipe and navigate as props
            ) : (
                <div>Error: Recipe not found.</div>
            )} */}

            <AddRecipeForm recipe={recipe} navigate={navigate} /> 
        </div>
    );
};

export default EditRecipePage;