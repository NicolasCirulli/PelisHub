import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import usuarioActions from '../../redux/actions/usuarioActions'
import { connect } from "react-redux"
import fotoDefault from '../../assets/user.png'
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';

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
    <div className="nav-container">
      <Navbar  expand="lg" className="colorBgNav" fixed='top'>
  <Container className="d-flex justify-content-center">
    <Navbar.Brand href="#home">
        <div>
           <Nav.Link as={Link} to='/' className="colorText">{imageLogo} </Nav.Link>
        </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link as={Link} to='/' className="colorText">Inicio </Nav.Link>
            <Nav.Link as={Link} to='/Peliculas' className="colorText"> Peliculas </Nav.Link>
            {props.rol === 'admin' ? 
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
             <NavDropdown.Item as={Link} to='/Admin' className="color-admin"> Admin </NavDropdown.Item>

               <NavDropdown.Item as={Link} to='/' onClick={() => { props.desloguearse() }}>
                   <p className="texto-usu d-flex justify-content-center align-items-center text-info bold-logout">Cerrar sesion <BiLogOut></BiLogOut></p>
               </NavDropdown.Item>
             </NavDropdown>
           </>

             : !props.foto ? (
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
               <Link to={`/Usuario`} className="no-decoration boton-fav d-flex justify-content-center align-intems-center"><p className="no-decoration boton-fav d-flex justify-content-center align-intems-center">Perfil <AiOutlineUser></AiOutlineUser></p></Link>
                <NavDropdown.Item as={Link} to='/' onClick={() => { props.desloguearse() }}>
                    <p className="texto-usu d-flex justify-content-center align-items-center text-info">Cerrar sesion <BiLogOut></BiLogOut></p>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
            
    </Navbar.Collapse>
  </Container>
</Navbar>



    </div>
  );
};



const mapDispatchToProps = {
  loguearse: usuarioActions.loguearse,
  desloguearse: usuarioActions.desloguearse,
}
const mapStateToProps = (state) => {
  return {
    foto: state.usuarioReducer.foto,
    rol: state.usuarioReducer.rol
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(NavBarMain)
