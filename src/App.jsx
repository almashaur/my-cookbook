import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { UserContext } from "./context/UserContext";

// Components
import Navbar from "./views/components/Navbar/Navbar";
// import Footer from './views/components/Footer/Footer';

// Pages
import LoginForm from "./views/components/forms/LoginForm/LoginForm";
import RegisterForm from "./views/components/forms/RegisterForm/RegisterForm";
import AllRecipes from "./views/pages/AllRecipes/AllRecipes";
import Dashboard from "./views/pages/HomePage/HomePage";
import AboutPage from "./views/pages/AboutPage/AboutPage";
import AddRecipeForm from "./views/components/forms/AddRecipe/AddRecipe";
import EditRecipeForm from "./views/components/forms/EditRecipe/EditRecipe";
import RecipeDetails from "./views/pages/RecipeDetails/RecipeDetails";
import MyRecipies from "./views/pages/MyRecipes/MyRecipies";

const App = () => {
  const { user } = useContext(UserContext);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <>
      <Navbar />
      <main className="container my-4">
        <Routes>
          <Route
            path="/"
            element={<Dashboard handleCuisineClick={handleCuisineClick} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/allrecipes"
            element={<AllRecipes cuisine={selectedCuisine} />}
          />
          <Route
            path="/recipedetails/:recipeId"
            element={<RecipeDetails recipe={selectedRecipe} />}
          />
          <Route path="/editrecipes/:recipeId" element={<EditRecipeForm />} />
          <Route path="/addrecipes" element={<AddRecipeForm />} />
          <Route path="/profile" element={<MyRecipies />} />
        </Routes>
      </main>
      {/* Uncomment and style your Footer component when ready */}
      {/* <Footer /> */}
    </>
  );
};

export default App;
