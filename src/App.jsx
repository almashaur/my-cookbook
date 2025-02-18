import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import { UserContext } from './context/UserContext';


// Routes
// components
import Navbar from './views/components/Navbar/Navbar';
import Footer from './views/components/Footer/Footer';

//pages
import Home from './views/pages/HomePage/HomePage';
import LoginPage from './views/pages/LoginPage/LoginPage';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/login" element={<LoginPage />} />


        </Routes>
      <Footer />
    </>

  );
};

export default App;