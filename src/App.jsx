import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import { UserContext } from './context/UserContext';

// Routes
// components
import Navbar from './views/components/Navbar/Navbar';
import Footer from './views/components/Footer/Footer';
import RecipeCard from './views/components/RecipeCard/RecipeCard';
// import RegistrationForm from './views/components/forms/RegistrationForm/RegistrationForm';
// import LoginForm from './views/components/forms/LoginForm/LoginForm';

//pages
import LoginPage from './views/pages/LoginPage/LoginPage';
import RegisterPage from './views/pages/RegisterPage/RegisterPage';
import AllRecipes from './views/pages/AllRecipes/AllRecipes';
import MyRecipes from './views/pages/MyRecipes/MyRecipes';
import RecipeDetails from './views/pages/RecipeDetails/RecipeDetails';
import AboutPage from './views/pages/AboutPage/AboutPage';
import Profile from "./views/pages/Profile/Profile";
// import AddRecipe from "./views/components/forms/AddRecipe/AddRecipe";
// import EditRecipe from "./views/components/forms/EditRecipe/EditRecipe";

// Test
import Dashboard from './views/pages/HomePage/HomePage';
import Landing from './views/pages/HomePage/TestHomePage';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/recipe/:id" element={<RecipeCard />} />

          <Route path="/recipes" element={<AllRecipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes/user/:id" element={<MyRecipes />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
    </>

  );
};

export default App;
