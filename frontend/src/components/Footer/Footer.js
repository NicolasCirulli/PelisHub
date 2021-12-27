import React from 'react'
import { Link } from "react-router-dom";
import {Nav, Navbar, Container, NavDropdown } from "react-bootstrap";


const Footer = ()=>{
    let imgFace = <img 
    src= '../assets/facebook.png'
    width="50"
    height="50"
    alt="Red social"
    />

    let imgInsta = <img 
    src= '../assets/instagram.png'
    width="50"
    height="50"
    alt="Red social"
    />

    let imgGit = <img 
    src= '../assets/github.png'
    width="50"
    height="50"
    alt="Red social"
    />

    return (
        <footer className="">
        <Container className="footer">
        <div>      
        <p className="textoFooter">Copyright © 2012 PelisHub All Rights Reserved</p>
       </div> 
       <div className="img-red">
          {imgFace}   
       </div>
       <div className="img-red">
          {imgInsta}
       </div>
         <div className="img-red">
          {imgGit} 
        </div> 
        <Navbar.Collapse id="responsive-navbar-nav" className='collapseFooter'>
              <Nav.Link as={Link} to='/IniciarSesion' className="colorText">Iniciar Sesión </Nav.Link>
              <Nav.Link as={Link} to='/Peliculas' className="colorText"> Peliculas </Nav.Link>
              <Nav.Link as={Link} to='/Registro' className="colorText"> Registro </Nav.Link>
       </Navbar.Collapse>
        <div>      
        <p className="textoFooter">Términos y condiciones Privacy & Policy Contacto</p>
       </div> 
       </Container>
    </footer>
    )
}


export default Footer