import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  const isAuthenticated = false; // Change this based on authentication state

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/">My Cookbook</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex me-3">
            <FormControl type="search" placeholder="Search recipes..." className="me-2" />
            <Button variant="outline-light">Search</Button>
          </Form>

          {/* User Authentication Section */}
          {isAuthenticated ? (
            <Nav>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/my-recipes">My Recipes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
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
