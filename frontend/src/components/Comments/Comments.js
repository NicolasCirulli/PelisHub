import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import swal from 'sweetalert2'
import comentaryAction from "../../redux/actions/comentarioActions"
import Comment from "./Comment"
import { IoSend } from 'react-icons/io5'
import toasty from "./Toast"
const Comments = (props) => {

    const [renderComments, setRenderComments] = useState(true)
    const inputHandler = useRef()
    const { peliculaId } = props
    const dispatch = useDispatch()

    const usuario = useSelector(state => state.usuarioReducer._id)
    const usuarioFoto = useSelector(state => state.usuarioReducer.foto)

    useEffect(() => {

        dispatch(comentaryAction.obtenerComentarios(peliculaId))

       

    }, [peliculaId])

    
    const comentarios = useSelector(state => state.comentarioReducer.comentarios)

    const sendComment = () => {

        let commentValue = inputHandler.current.value;
        if (usuario) {
            if (commentValue !== '') {
                
                dispatch(comentaryAction.agregarComentarios(commentValue,peliculaId, usuarioFoto , usuario ))
                .then((res) => {
                    dispatch(comentaryAction.obtenerComentarios(peliculaId))
                    setRenderComments(!renderComments)
                })
                .catch((error) => console.log(error))
                inputHandler.current.value = '';

            } else {
                toasty('error', 'No podes enviar comentarios vacios!')
            }
        } else {
            toasty('error', 'Debes estar logueado para dejar una reseña!')
        }

    }

    const handlerEnter = (e) => {
        if (e.key === 'Enter') {
            sendComment()
        }
    }


    const editComment = (id, comentario) => {
        dispatch(comentaryAction.editarComentario(id, comentario))
            .then((res) => {

                dispatch(comentaryAction.obtenerComentarios(peliculaId))
                setRenderComments(!renderComments)

            })
            .catch((error) => console.log(error))
    }
    

    const deleteComment = (comentarioId) => {
        dispatch(comentaryAction.eliminarComentario(comentarioId))
            .then((res) => {
                dispatch(comentaryAction.obtenerComentarios(peliculaId))
                // setRenderComments(!renderComments)
            })
            .catch((error) => console.log(error))
    }

    return (

        <>  
            <div className="containerComentaryImg">

            {comentarios && comentarios.map((comentario) => {
                return (
                    <Comment render={renderComments} comentarios={comentario} deleteComment={deleteComment} editComment={editComment} />
                )

            })}

            <div className='containerInputSend'>
                <input type="text" ref={inputHandler} placeholder='Write a comment' onKeyPress={handlerEnter} className='comment' />
                <IoSend className="send" onClick={() => sendComment()} />
            </div>

            </div>

        </>

    )
}

export default Comments
