import { useContext } from "react";
import { Navbar, Nav, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

import { UserContext } from '../../../context/UserContext';



const MyNavbar = () => {
  const { user } = useContext(UserContext);

    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.reload();
      };
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">My Cookbook</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/allrecipes">Recipes</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          {user ? (
            <Nav>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as="button" onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
