import axios from 'axios';
import Swal from 'sweetalert2';

const Alert = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


const usuarioActions = {
    nuevoUsuario: (usuario) => {
        return async (dispatch) => {
            console.log(usuario)
            try {
                const respuesta = await axios.post('http://localhost:4000/api/user/registrarse', {...usuario})
                

                if(respuesta.data.success) {
                    localStorage.setItem('token', respuesta.data.response.token)
                    dispatch({ type: 'LOGUEADO', payload: respuesta.data.response })
                    return respuesta.data
                } else {
                    console.log('no se registro pa');
                    return respuesta.data
                }
            } catch(err) {
                console.log(err);
            }
        }
    },
    loguearse: (datosUsuario) => {
        return async (dispatch) => {
            console.log(datosUsuario)
            try {
                const respuesta = await axios.post('http://localhost:4000/api/user/ingresar', { ...datosUsuario })
                console.log(respuesta);

                
                if(respuesta.data.success) {
                    localStorage.setItem('token', respuesta.data.response.token)
                    dispatch({ type: 'LOGUEADO', payload: respuesta.data.response })
                    return respuesta.data
                } else {
                    console.log('esta mal pa');
                    return respuesta.data
                }
            } catch(err) {
                console.log(err);
            }
        }
    },
    desloguearse:() => {
        return (dispatch) => {
            localStorage.clear()
            Alert.fire({
                title: 'Saliste de sesion',
                icon: 'success'
            })
            dispatch({ type: 'DESLOGUEARSE', payload: {}})
        }
    },
    iniciarConToken:  (token) =>{
        return async (dispatch) => {
            try{
                let respuesta = await axios.get('http://localhost:4000/api/verifyToken', {
            headers: {
                Authorization: 'Bearer '+ token,
            }
        })
        console.log(respuesta)
            dispatch({type:"LOGUEADO", payload:{token, nombre:respuesta.data.response.nombre, foto: respuesta.data.response.foto, _id:respuesta.data.response._id}})
            }catch(error) {
              console.log(error);
            }
        }
    }

}

export default usuarioActions

