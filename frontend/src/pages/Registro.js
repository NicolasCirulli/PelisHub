import React,{useRef} from 'react';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import usuarioActions from "../redux/actions/usuarioActions";
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';

const Registro = () => {

  const Alert = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


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
          Alert.fire({
            title: 'Se registro con exito!',
            icon: 'success'
          })
        }else{
          respuesta.errors.map(e=> {
            Alert.fire({
              title: e.message,
              icon: 'error'
            })
          })
        }

      }catch(err){console.log(err)}
    } else {
      Alert.fire({
        title: 'Complete los campos porfavor!',
        icon: 'error'
      })
    }
  }

  const responseGoogle = async (respuesta) => {
    console.log('google', respuesta);
    let usuarioGoogle = {
      nombre: respuesta.profileObj.name, 
      mail: respuesta.profileObj.email,
      contrasenia: respuesta.profileObj.googleId,
      foto: respuesta.profileObj.imageUrl,
      apellido: 'null',
      google: true
    }
    await dispatch (usuarioActions.nuevoUsuario(usuarioGoogle))
    .then(res => {
      if (res.success) {
        Alert.fire({
            icon: 'success',
            title: 'Tu cuenta a sido creada'
          })
    }
    else{
      Alert.fire({
        title: 'No se pudo registrar con Google',
        icon: 'error'
      })
    }
    })
    .catch((error) => {
      console.log(error)
      Alert.fire({
          icon: 'error',
          title: 'Algo salio mal! Vuelve en un rato!'
        })
  })
  }


  return (
    <Form className="d-flex flex-column form-container" variant="light" onSubmit={crearUsuario}>

      <h1 className="text-light mb-5">Registro</h1>

        <Form.Group className="mb-3 col-5" controlId="formBasicNombre">
          <Form.Label  className="text-light">Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" ref={nombre} />
        </Form.Group>

        <Form.Group className="mb-3 col-5" controlId="formBasicApellido">
          <Form.Label    className="text-light">Apellido</Form.Label>
          <Form.Control type="text" placeholder="Apellido" ref={apellido} />
        </Form.Group>

        <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
          <Form.Label   className="text-light">Email</Form.Label>
          <Form.Control type="email" placeholder="Email" ref={mail} />
        </Form.Group>

        <Form.Group className="mb-3 col-5" controlId="formBasicPassword">
          <Form.Label  className="text-light">Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" ref={contrasenia} />
        </Form.Group>
        
        <Form.Group className="mb-3 col-5" controlId="formBasicImage">
          <Form.Label className="text-light">URL de imagen</Form.Label>
          <Form.Control type="text" placeholder="Imagen"ref={foto}  />
        </Form.Group>

        <Button className="button-send"  type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Enviar
      </Button>

      <GoogleLogin
    clientId="1088157262762-4n3b7fopip582vdipdm7i44t6ulpbt1e.apps.googleusercontent.com"
    buttonText="Registarse con Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />

</Form>
  )
}

export default Registro