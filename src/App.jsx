import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import { UserContext } from './contexts/UserContext';


// Routes
//components
import Navbar from './views/components/Navbar/Navbar';
import Footer from './views/components/Footer/Footer';

//pages


const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />
        <Routes>

        </Routes>
      <Footer />
    </>

  );
};

export default App;