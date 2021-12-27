import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import usuarioActions from "../redux/actions/usuarioActions";

const Loguearse = () => {
  const dispatch = useDispatch();

  const mail = useRef()
  const contrasenia = useRef()

 
  const logearse = async(e) =>{
    e.preventDefault()
    if(mail.current.value != '' && contrasenia.current.value != ''){

      try{
        
        const respuesta = await dispatch(
          usuarioActions.loguearse({
            mail: mail.current.value,
            contrasenia: contrasenia.current.value,
          })
          );
          
          if(respuesta.success){
            alert('bienvenido '+ respuesta.response.nombre)
            mail.current.value = ''
            contrasenia.current.value = ''
          }else{alert(respuesta.error)}
          
        }catch(err){console.log(err)}
      }else{
        alert('complete los campos')
      }
  }
  /* 
  joaco_nc@yahoo.com
  */

  return (
    <Form
      className="d-flex flex-column form-container"
      variant="light"
      onSubmit={logearse}
    >
      <h1 className="text-light mb-5">Iniciar Sesion</h1>
      <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
        <Form.Label className="text-light">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={mail} />
      </Form.Group>

      <Form.Group className="mb-3 col-5" controlId="formBasicPassword">
        <Form.Label className="text-light" >Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={contrasenia} />
      </Form.Group>
      <Button className="button-send"  type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Enviar
    </Button>
    </Form>
  );
};

export default Loguearse;
