import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import { UserContext } from './context/UserContext';


// Routes
// components
import Navbar from './views/components/Navbar/Navbar';
// import Footer from './views/components/Footer/Footer';

//pages
import LoginForm from './views/components/forms/LoginForm/LoginForm';
import RegisterForm from './views/components/forms/RegisterForm/RegisterForm';
import AllRecipes from './views/pages/AllRecipes/AllRecipes';

// Test
import Dashboard from './views/pages/HomePage/HomePage';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/allrecipes" element={<AllRecipes />} />

        </Routes>
      {/* <Footer /> */}
    </>

  );
};

export default App;