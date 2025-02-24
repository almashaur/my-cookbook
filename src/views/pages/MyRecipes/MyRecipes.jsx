import { useState, useEffect, useContext } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { UserContext } from '../../../context/UserContext';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedMyRecipes = await fetch(`/recipes?owner=${user._id}`);
        if (!fetchedMyRecipes.ok) throw new Error('Failed to fetch my recipes');
        const data = await fetchedMyRecipes.json();
        setRecipes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, [user]);

  return (
    <div>
      <h1>My Recipes</h1>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default MyRecipes;
