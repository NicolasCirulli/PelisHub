import React,{useEffect,useState} from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import NavBarMain from './components/NavBar'
import Footer from './components/Footer'

import Inicio from "./pages/Inicio"
import Peliculas from './pages/Peliculas'
import Registro from './pages/Registro'
import Loguearse from './pages/Loguearse'


function App() {
  return (
    <BrowserRouter>
    <div className="container-fluid">
      <NavBarMain/>
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/Peliculas" element={<Peliculas />}></Route>
        <Route path="/Registro" element={<Registro />}></Route>
        <Route path="/IniciarSesion" element={<Loguearse />}></Route>
      
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
