import React,{useEffect,useState} from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBarMain from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

import Inicio from "./pages/Inicio"
import Peliculas from './pages/Peliculas'
import Registro from './pages/Registro'
import Loguearse from './pages/Loguearse'
import Ficha from './pages/Ficha'
import Usuario from './pages/Usuario'


function App() {
  return (
    <BrowserRouter>
    <div className="container-fluid">
      <NavBarMain/>
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/Peliculas" element={<Peliculas />}></Route>
        <Route path='/Peliculas/:id' element={<Ficha />}></Route>
        <Route path="/Registro" element={<Registro />}></Route>
        <Route path="/IniciarSesion" element={<Loguearse />}></Route>
        <Route path="/Usuario" element={<Usuario />}></Route>
      
      </Routes>
      <Footer/>
    </div>
      <ToastContainer
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
        />
      <ToastContainer /> 

    </BrowserRouter>
  );
}

export default App;
