import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const MyRecipes = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <h2>Your Recipes</h2>
      <p>Here are the recipes you've saved:</p>
      <ul>
        <li>Recipe 1</li>
        <li>Recipe 2</li>
        <li>Recipe 3</li>
      </ul>
    </div>
  );
};

export default MyRecipes;
