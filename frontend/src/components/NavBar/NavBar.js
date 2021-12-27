import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";


const NavBarMain = () => {
  let imageUsu = <img
    src='../assets/user.png'
    width="50"
    height="45"
    alt="User"
  />

  return (
    <>
      <Navbar bg="transparent" expand="lg" className="colorBgNav">
        <Container className="cont-nav">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div>
              <Navbar.Brand className="colorText">PelisHub</Navbar.Brand>
            </div>
            <div className="segundaNav">
            <Nav.Link as={Link} to='/' className="colorText">Inicio </Nav.Link>
            <Nav.Link as={Link} to='/Peliculas' className="colorText"> Peliculas </Nav.Link>
            <Nav.Link as={Link} to='/Registro' className="colorText"> Registro </Nav.Link>
            <NavDropdown className="navText navIcon" title={imageUsu} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='/IniciarSesion'> Iniciar Sesion</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/IniciarSesion'> Registrate</NavDropdown.Item>
            </NavDropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarMain;
