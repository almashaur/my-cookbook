import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';

const MyRecipes = () => {
    const { user, setUser } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchMyRecipes = async () => {
                try {
                    const fetchedMyRecipes = await fetch(`/api/recipes?owner=${user._id}`);
                    if (!fetchedMyRecipes.ok) throw new Error('Failed to fetch my recipes');
                    const data = await fetchedMyRecipes.json();
                    setRecipes(data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchMyRecipes();
        }
    }, [user]);

    return (
        <div className="recipe-list-container">
            <h1>My Recipes</h1>
            <ul>
                {!user ? (
                    <p>Please sign in to view your recipes.</p>
                ) : (
                    <>
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
                    </>
                )}
            </ul>
        </div>
    );
};

export default MyRecipes;
