import axios from 'axios';

const usuarioActions = {
    nuevoUsuario: (usuario) => {
        return async (dispatch) => {
            try {
                const respuesta = await axios.post('http://localhost/4000/api/user/registrase', {...usuario})
                console.log(respuesta);
                if(respuesta.data.success) {
                    localStorage.setItem('token', respuesta.data.response.token)
                    dispatch({ type: 'LOGUEADO', payload: respuesta.data.response })
                } else {
                    console.log('no se registro pa');
                }
            } catch(err) {
                console.log(err);
            }
        }
    },
    loguearse: (datosUsuario) => {
        return async (dispatch) => {
            try {
                const respuesta = await axios.post('http://localhost:4000/api/user/ingresar', { ...datosUsuario })
                if(respuesta.data.success) {
                    dispatch({ type: 'LOGUEADO', payload: respuesta.data.response })
                } else {
                    console.log('esta mal pa');
                }
            } catch(err) {
                console.log(err);
            }
        }
    },
    desloguearse:() => {
        return (dispatch) => {
            localStorage.clear()
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
            dispatch({type:"LOGUEADO", payload:{token, nombre:respuesta.data.nombre, foto: respuesta.data.foto, _id:respuesta.data._id}})
            }catch(error) {
              console.log(error);
            }
        }
    }

}

export default usuarioActions

