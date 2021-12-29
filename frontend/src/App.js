import React,{useEffect,useState} from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {useSelector, useDispatch} from 'react-redux'

import usuarioActions from "./redux/actions/usuarioActions";

import ScrollToTop from '../src/components/ScrollToTop';

import NavBarMain from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

import Inicio from "./pages/Inicio"
import Peliculas from './pages/Peliculas'
import Registro from './pages/Registro'
import Loguearse from './pages/Loguearse'
import Ficha from './pages/Ficha'
import Usuario from './pages/Usuario'
import Admin from './pages/Admin'


function App() {

  const dispatch = useDispatch()
  const usuario = useSelector(state => state.usuarioReducer._id)
  const rol = useSelector(state => state.usuarioReducer.rol)
  const token = localStorage.getItem('token')
  useEffect(() => {

   (token && !usuario) && dispatch(usuarioActions.iniciarConToken(token))

  }, [])



  return (
    <BrowserRouter>
    <ScrollToTop/>
    <div className="container-fluid">
      <NavBarMain/>
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path='/Peliculas' element={<Peliculas />}></Route>
        <Route path='/Peliculas/:id' element={<Ficha />}></Route>
        {!usuario && <Route path="/Registro" element={<Registro />}></Route>}
        {!usuario && <Route path="/IniciarSesion" element={<Loguearse />}></Route>}
        {!rol && (rol === 'admin') && <Route path='/Admin' element={<Admin />}></Route>}
        {!rol && (rol === 'usuario') &&<Route path='/Usuario' element={<Usuario />}></Route>}
        <Route path='*' element={<Inicio />}></Route>
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
