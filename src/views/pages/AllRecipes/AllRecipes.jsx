import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';

const AllRecipes = () => {
    const { user, setUser } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await fetch(`/api/recipes`);
                if (!fetchedRecipes.ok) throw new Error('Failed to fetch recipes');
                const data = await fetchedRecipes.json();
                setRecipes(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (user) {
            fetchRecipes();
        }
    }, [user]);

    return (
        <div className="recipe-list-container">
            <h1>Recipes</h1>
            <ul>
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <li key={recipe._id} className="recipe-card">
                            <div className="recipe-image">
                                <img src={recipe.image[0]} alt={recipe.recipeName} style={{ width: '100px' }} />
                            </div>
                            <div className="recipe-info">
                                <div className="recipe-details">
                                    <h2>{recipe.recipeName}</h2>
                                    <p>Cuisine: {recipe.cuisine}</p>
                                    <p>Level: {recipe.level}</p>
                                </div>
                                <div className="recipe-actions">
                                    <Link to={`/recipe/${recipe._id}`}><button>View</button></Link>
                                    <button>Edit</button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </ul>
        </div>
    );
};

export default AllRecipes;
