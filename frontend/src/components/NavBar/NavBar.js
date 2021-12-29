import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import usuarioActions from '../../redux/actions/usuarioActions'
import { connect } from "react-redux"
import fotoDefault from '../../assets/user.png'
import { BiLogOut } from 'react-icons/bi';


function NavBarMain (props) {
  
  let imageUsu = <img
    src={fotoDefault}
    width="50"
    height="45"
    alt="User"
  />

  let imageLogo = <img
    src= '../../assets/logopelishub.png'
    width="150"
    height="50"
    alt="logo"
  />


  return (
    <>
      <Navbar bg="transparent" expand="lg" className="colorBgNav">
        <Container className="cont-nav">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div>
            <Nav.Link as={Link} to='/' className="colorText">{imageLogo} </Nav.Link>
            </div>
            <Nav.Link as={Link} to='/' className="colorText">Inicio </Nav.Link>
            <Nav.Link as={Link} to='/Peliculas' className="colorText"> Peliculas </Nav.Link>
            {!props.foto ? (
            <NavDropdown className="navText navIcon" title={imageUsu} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='/IniciarSesion'> Iniciar Sesion</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/Registro'> Registro</NavDropdown.Item>
            </NavDropdown>
            ) : (
              <>
              <NavDropdown
                className="texto-usu"
                title={
                  <img
                    src={
                      props.foto
                        ? props.foto
                        : fotoDefault
                    }
                    className="foto-usu"
                    alt="foto-usuario"
                  />
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to='/' onClick={() => { props.desloguearse() }}>
                    <span className="texto-usu">Cerrar sesion <BiLogOut></BiLogOut></span>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapDispatchToProps = {
  loguearse: usuarioActions.loguearse,
  desloguearse: usuarioActions.desloguearse,
}
const mapStateToProps = (state) => {
  return {
    foto: state.usuarioReducer.foto,
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(NavBarMain)
