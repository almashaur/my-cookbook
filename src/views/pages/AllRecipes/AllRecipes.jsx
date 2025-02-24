import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import RecipeCard from './../../components/RecipeCard/RecipeCard';

const AllRecipes = () => {
    const { user, setUser } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await fetch(`/recipes`);
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
    }, []);

    return (
        <div>
          <h1>All Recipes</h1>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      );
};

export default AllRecipes;
