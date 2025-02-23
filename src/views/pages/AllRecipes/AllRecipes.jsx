import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const AllRecipes = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
        <h1>Welcome, {user.name}!</h1>
        <h2>All Recipes</h2>
        <p>Here are all the recipes:</p>
        <ul>
            <li>Recipe 1</li>
            <li>Recipe 2</li>
            <li>Recipe 3</li>
        </ul>
        </div>
    );
    }

export default AllRecipes;