import React from 'react'
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";


const Footer = () => {
   let imgFace = <img
   className='img-red'
      src='../assets/facebook.png'
      alt="Red social"
   />

   let imgInsta = <img
   className='img-red'
      src='../assets/instagram.png'
      alt="Red social"
   />

   let imgGit = <img
   className='img-red'
      src='../assets/github.png'
      alt="Red social"
   />

   return (
      <footer className="">
         <Container className="footer">
            <div className='primeraFooter'>
               <div className='redesSociales'>
                  <div className="img-red">
                     {imgFace}
                  </div>
                  <div className="img-red">
                     {imgInsta}
                  </div>
                  <div className="img-red">
                     {imgGit}
                  </div>
               </div>
               <div className='segundaFooter'>
                  <Navbar.Collapse id="responsive-navbar-nav" className='collapseFooter'>
                     <Nav.Link as={Link} to='/IniciarSesion' className="colorText">Iniciar Sesión </Nav.Link>
                     <Nav.Link as={Link} to='/Peliculas' className="colorText"> Peliculas </Nav.Link>
                     <Nav.Link as={Link} to='/Registro' className="colorText"> Registro </Nav.Link>
                  </Navbar.Collapse>
            </div>
                  </div>
                  <div>
                  <p className="textoFooter">Términos y condiciones Privacy & Policy Contacto</p>
               </div>
         </Container>
      </footer>
   )
}


export default Footer