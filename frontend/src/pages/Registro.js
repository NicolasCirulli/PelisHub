import React,{useRef} from 'react';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import usuarioActions from "../redux/actions/usuarioActions";
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from "react-icons/fc";

const Registro = () => {

  const Alert = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    background: 'black',
    color: 'white',
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
          foto : foto.current.value,
          peliculasLikeadas : []
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
    console.log(respuesta);
    let usuarioGoogle = {
      nombre: respuesta.profileObj.givenName, 
      // apellido: respuesta.profileObj.familyName ? respuesta.profileObj.familyName : 'null',
      apellido: respuesta.profileObj.familyName,
      mail: respuesta.profileObj.email,
      contrasenia: respuesta.profileObj.googleId,
      foto: respuesta.profileObj.imageUrl,
      google: true,
      rol: 'usuario',
      peliculasLikeadas : []
    }
    await dispatch (usuarioActions.nuevoUsuario(usuarioGoogle))
    .then(res => {
      if (res.success) {
        console.log(res)
        Alert.fire({
          icon: 'success',
          title: 'Tu cuenta ha sido creada'
        })
      }
      else{
        console.log(res)
        Alert.fire({
        title: res.error[0].message,
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

        <div className="d-flex justify-content-center align-center container-buttons">

        <Button className="button-send"  type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Registrarse
      </Button>
      
    <span className="o-google">o</span>

      <GoogleLogin
            clientId="298582516064-getr6393pgro6pje2hs218l17t27bdv5.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className="btn-google button-send" disabled={renderProps.disabled}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <FcGoogle className="mx-3" style={{fontSize: "2rem"}} />
              </button>
            )}
            buttonText="Registarse con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
      />  

    </div>

</Form>
  )
}

export default Registro