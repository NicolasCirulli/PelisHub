import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import swal from 'sweetalert2'
import comentaryAction from "../../redux/actions/comentarioActions"
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import Swal from 'sweetalert2'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import toasty from "./Toast"

const Comment = (props) => {
    const { comentarios } = props
    const [shown, setShown] = useState(false)
    const dispatch = useDispatch()
    const inputHandler = useRef()
    const usuario = useSelector(state => state.usuarioReducer._id)

    const [likeIcon, setLikeIcon] = useState(true)
    const [itinerariesLikes, setItinerariesLikes] = useState(comentarios.likes)

    let liked = itinerariesLikes.includes(usuario && usuario) ? <FaHeart className="heartIconRed" /> : <FaRegHeart className="heartIcon" />

    const confirmAlert = (comentarioId) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                props.deleteComment(comentarioId)
                Swal.fire(
                    'Deleted!',
                    'Your comment has been deleted.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        setShown(false)
    }, [props.render])


    const likeItinerary = async () => {
        setLikeIcon(false)
        if (!usuario) {
            toasty('error', 'Debes estar logueado para darle me gusta al comentario!')
        } else {
            let response = await dispatch(comentaryAction.likeItinerary(comentarios._id, usuario))

            setItinerariesLikes(response)

        }
        setLikeIcon(true)
    }



    return (

        <>
            {
                usuario && (usuario == comentarios.idUsuario)
                    ?

                    (

                        !shown ? (
                            <div key={comentarios._id} className="containerComent">

                                <img className="imguser " src={comentarios.comentaryPhoto} alt="usericon"></img>
                                <p className='comment'>{comentarios.comentario} </p>
                                <FaPencilAlt className="iconEdit" onClick={() => setShown(!shown)} />
                                <div  className="containerLik">
                                <p className='me-3'>{itinerariesLikes.length}</p>
                                {liked}

                            </div>

                            </div>
                        )
                            : (
                                <div key={comentarios.comentaryPhoto} className="containerComent">
                                    <img className="imguser " src={comentarios.comentaryPhoto} alt="usericon"></img>
                                    <input type="text" className='comment' defaultValue={comentarios.comentario} ref={inputHandler} />
                                    <IoSend className="send" onClick={() => props.editComment(comentarios._id, inputHandler.current.value)} />
                                    <FaTrashAlt className="iconDelete" onClick={() => confirmAlert(comentarios._id)} />
                                </div>
                            )

                    )



                    : (
                        <div key={comentarios.comentario} className="containerComent">
                            <img className="imguser " src={comentarios.comentaryPhoto} alt="usericon"></img>
                            <p className='comment'>{comentarios.comentario} </p>
                            <div onClick={(likeIcon ? likeItinerary : null)} className="containerLikes">
                                <p className='me-3'>{itinerariesLikes.length}</p>
                                {liked}

                            </div>
                        </div>
                    )
            }




        </>

    )
}

export default Comment
