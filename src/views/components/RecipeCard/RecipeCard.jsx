import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div>
      <h3>{recipe.recipeName}</h3>
      <p>{recipe.image}</p>
      <p>{recipe.level}</p>
      <Link to={`/recipes/${recipe._id}`}><button>View Recipe</button></Link>
    </div>
  );
};

export default RecipeCard;
