import axios from 'axios'
const comentaryAction = {
    
    agregarComentarios:(comentario,idPelicula,comentaryPhoto, idUsuario )=>{
        return async (dispatch) => {
                    try{
                        let response = await axios.post(`https://pelishub.herokuapp.com/api/user/comentario`, {comentario,idPelicula,comentaryPhoto, idUsuario} )
                        // console.log(response.data.response.nuevoComentario)
                        dispatch({ type: 'ADD_COMENTARY', payload: response.data.response.nuevoComentario })
                        return response.data
                    }catch (error){
                       console.log(error)
                    }
        }
    },

    obtenerComentarios: (id) => {
        return async (dispatch) => {
           
            const response = await axios.get(`https://pelishub.herokuapp.com/api/user/comentario/${id}`)
           
            dispatch({ type: 'GET_COMENTARY', payload: response.data.response})
      
        }
    },
    editarComentario:(id,comentario)=>{
        return async (dispatch) => {
      
            const response = await axios.put(`https://pelishub.herokuapp.com/api/user/comentario/${id}`,{comentario})
          
            // return ({ response: response.data.response.actualizado, success: true })
      
        }
    },
    
    eliminarComentario:(id)=>{
        return async (dispatch) => {
      
            const response = await axios.delete(`https://pelishub.herokuapp.com/api/user/comentario/${id}`)
            // return ({ response: response.data.response.comentary, success: true })
      
        }
    },

    likeItinerary: (id,idUser) =>{
        return async () => {
                try{
                    let response = await axios.put(`https://pelishub.herokuapp.com/api/user/comentario/likes/${id}`,{idUser})
              
                    return response.data.response
            
                }catch (error){
                    console.log(error)
                }
            
        }
    }

    
}

export default comentaryAction