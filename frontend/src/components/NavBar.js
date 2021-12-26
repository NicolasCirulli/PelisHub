import React from "react";
import { Link } from "react-router-dom";
import {Nav, Navbar, Container, NavDropdown } from "react-bootstrap";


const NavBarMain = () => {
  
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>PelisHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav.Link as={Link} to='/'>Inicio </Nav.Link>
              <Nav.Link as={Link} to='/Peliculas'> Peliculas </Nav.Link>
              <Nav.Link as={Link} to='/Registro'> Registro </Nav.Link>
              <Nav.Link as={Link} to='/IniciarSesion'> Iniciar Sesion </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarMain;
