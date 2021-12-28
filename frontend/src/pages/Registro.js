import React,{useRef} from 'react';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import usuarioActions from "../redux/actions/usuarioActions";



const Registro = () => {


  const dispatch = useDispatch()

  const nombre = useRef()
  const apellido = useRef()
  const mail = useRef()
  const contrasenia = useRef()
  const foto = useRef()

  const crearUsuario = async(e)=>{
    e.preventDefault()
    if( nombre.current.value != '' && apellido.current.value != '' && mail.current.value && contrasenia.current.value && foto.current.value){
      try{

        const respuesta = await dispatch(usuarioActions.nuevoUsuario({
          nombre : nombre.current.value,
          apellido : apellido.current.value,
          mail : mail.current.value,
          contrasenia : contrasenia.current.value,
          foto : foto.current.value
        }))

        console.log(respuesta)
        if(respuesta.success){
          alert('Cuenta creada')
        }else{
          respuesta.error.map(e=> {
            alert(e.message)
          })
        }

      }catch(err){console.log(err)}
    }
  }


  return (
    <Form className="d-flex flex-column form-container" variant="light" onSubmit={crearUsuario}>

      <h1 className="text-light mb-5">Registro</h1>

        <Form.Group className="mb-3 col-5" controlId="formBasicNombre">
          <Form.Label  className="text-light">Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" ref={nombre} required/>
        </Form.Group>

        <Form.Group className="mb-3 col-5" controlId="formBasicApellido">
          <Form.Label    className="text-light">Apellido</Form.Label>
          <Form.Control type="text" placeholder="Apellido" ref={apellido} required/>
        </Form.Group>

        <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
          <Form.Label   className="text-light">Email</Form.Label>
          <Form.Control type="email" placeholder="Email" ref={mail} required/>
        </Form.Group>

        <Form.Group className="mb-3 col-5" controlId="formBasicPassword">
          <Form.Label  className="text-light">Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" ref={contrasenia} required/>
        </Form.Group>
        
        <Form.Group className="mb-3 col-5" controlId="formBasicImage">
          <Form.Label className="text-light">URL de imagen</Form.Label>
          <Form.Control type="text" placeholder="Imagen"ref={foto} required />
        </Form.Group>

        <Button className="button-send"  type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Enviar
      </Button>
</Form>
  )
}

export default Registro