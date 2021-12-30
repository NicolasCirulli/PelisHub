import React, {  useState,  useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import CardFavorita from "../components/CardFavorita/CardFavorita"
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import Swal from 'sweetalert2'
import usuarioActions from "../redux/actions/usuarioActions";


const Usuario = (props) => {
    
    const [peliculas, setPeliculas] = useState([])
    const [favorita, setFavorita] = useState([])
    const [shown, setShown] = useState(false)
    const [showApellido, setShowApellido] = useState(false)

    const inputHandler = useRef()

    let pelis = []    
    let likeadas = props.usuario.peliculasLikeadas
    console.log(likeadas)

    const fetchearPorId = async (id) => {
          try {
            const res = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=43fd83d3a9756a2f59b0de39480b3bf7&language=es-MX`
            )
            console.log(res)
            setFavorita(res.data)

            return res.data

          } catch (err) {
            console.log(err)
          }
    }

    const traerFavoritas = async () => {
        try {
            let auxiliar = []
            likeadas.length>0 &&
            likeadas.map(async (idPelicula) => {
                let pel = await fetchearPorId(idPelicula)
                auxiliar.push(pel)
                /* pelis.push(favorita) */
            })
            setPeliculas(auxiliar)

        }catch(error) {
            console.log(error)
        }
        /* console.log('las pelis favoritas son:',peliculas) */
        /* setFavoritas(pelis)
        console.log('las favoritas son:',favoritas) */
    }

    useEffect(() => {
        setShown(false)
        setShowApellido(false)
        traerFavoritas()
    },[])  


    const confirmChange = (data) => {
        Swal.fire({
            title: 'Estas seguro?',
            icon: 'warning',
            background: 'black',
            color: 'white',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo cambiarlo'
        }).then((result) => {
            if (result.isConfirmed) {

                props.editUserData(props.usuario._id,{nombre:data})
                
                setShown(!shown)
                Swal.fire({
                    background: 'black',
                    color: 'white',
                    title: 'Cambio Realizado!',
                    text: 'Tu nombre ha sido cambiado.',
                    icon: 'success'
                })
            } else {
                setShown(!shown)
            }
        })
    }

    const confirmFoto = () => {
        Swal.fire({
            title: 'Cambia Foto',
            text: "Ingresa la ruta de tu nueva foto:",
            input: 'text',
            icon: 'warning',
            background: 'black',
            color: 'white',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {

                props.editUserData(props.usuario._id,{foto:result.value})
                
                setShown(false)
                setShowApellido(false)
                Swal.fire({
                    background: 'black',
                    color: 'white',
                    title: 'Cambio Realizado!',
                    text: 'Tu foto ha sido cambiada.',
                    icon: 'success'
                })
            } else {
                setShown(false)
                setShowApellido(false)
            }
        })
    }

    const confirmChangeApellido = (data) => {
        Swal.fire({
            title: 'Estas seguro?',
            icon: 'warning',
            background: 'black',
            color: 'white',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo cambiarlo'
        }).then((result) => {
            if (result.isConfirmed) {

                props.editUserData(props.usuario._id,{apellido:data})
                
                setShowApellido(!showApellido)
                Swal.fire({
                    background: 'black',
                    color: 'white',
                    title: 'Cambio Realizado!',
                    text: 'Tu apellido ha sido cambiado.',
                    icon: 'success'
                })
            } else {
                setShowApellido(!showApellido)
            }
        })
    }

    const confirmPassword = () => {
        Swal.fire({
            title: 'Cambio de Password',
            text: "Ingresa la nueva contraseña:",
            input: 'text',
            icon: 'warning',
            background: 'black',
            color: 'white',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {

                let newPassword = result.value

                Swal.fire({
                    title: 'Cambio de Password',
                    text: "Confirma tu nueva contraseña:",
                    input: 'text',
                    icon: 'warning',
                    background: 'black',
                    color: 'white',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {

                        if (newPassword===result.value) {
                            props.editUserData(props.usuario._id,{contrasenia:result.value})
                            setShown(false)
                            setShowApellido(false)
                            Swal.fire({
                                background: 'black',
                                color: 'white',
                                title: 'Cambio Realizado!',
                                text: 'Tu contraseña ha sido cambiada.',
                                icon: 'success'
                            })
                        } else {
                            setShown(false)
                            setShowApellido(false)
                            Swal.fire({
                                background: 'black',
                                color: 'white',
                                title: 'Cambio Rechazado',
                                text: 'El nuevo valor ingresado no coincide.',
                                icon: 'error'
                            })
                        }
                    }
                    else {
                        setShown(false)
                        setShowApellido(false)
                    }
                })
            }
        })
    }

        return (
            <div className="main-ficha">
                {
                    (!props.usuario.google)
                    ?
                        (!shown && !showApellido) ? (
                            <div className="cabecera-usuario">
                                <div className="foto-usuario">
                                    {
                                        props.usuario.foto!=='' ? <img src={props.usuario.foto} alt="foto user"/>
                                        : <img src="../../assets/user.png" alt="foto user"/>
                                    }
                                    <p type="button" onClick={() => confirmFoto()} className="parrafo light-text">Editar Foto</p>
                                </div>
                                <div className="datos-usuario">

                                    <h3 className="light-text negrita">Datos Usuario</h3>
                                    <div className="fila">
                                        <p className="parrafo light-text"><span className="negrita">Nombre:</span>{props.usuario.nombre}</p>
                                        <FaPencilAlt className="iconEdit light-text" onClick={() => setShown(!shown)} />
                                    </div>
                                    <div className="fila">
                                        <p className="parrafo light-text"><span className="negrita">Apellido:</span>{props.usuario.apellido}</p>
                                        <FaPencilAlt className="iconEdit light-text" onClick={() => setShowApellido(!showApellido)} />
                                    </div>
                                    <div className="fila">
                                        <p className="parrafo light-text"><span className="negrita">Contraseña:</span>* * * * * * * *</p>
                                        <FaPencilAlt className="iconEdit light-text" onClick={() => confirmPassword()} />
                                    </div>
                                </div>
                            </div>
                        )
                        : ( (shown && !showApellido) ?
                            <div className="cabecera-usuario">
                                <div className="foto-usuario">
                                    {
                                        props.usuario.foto!=='' ? <img src={props.usuario.foto} alt="foto user"/>
                                        : <img src="../../assets/user.png" alt="foto user"/>
                                    }
                                    <p className="parrafo light-text">Editar Foto</p>
                                </div>
                                <div className="datos-usuario">

                                    <h3 className="light-text negrita">Datos Usuario</h3>
                                    <div className="fila">
                                        <p className="parrafo light-text"><span className="negrita">Nombre:</span></p>
                                        <input type="text" className="parrafo edit-data" defaultValue={props.usuario.nombre} ref={inputHandler} />
                                        <IoSend className="send light-text" onClick={() => confirmChange(inputHandler.current.value)} />
                                        <FaTrashAlt className="iconDelete light-text" onClick={() => setShown(false)} />
                                    </div>
                                    <div className="fila">
                                        <p className="parrafo light-text"><span className="negrita">Apellido:</span>{props.usuario.apellido}</p>
                                    </div>
                                    <p className="parrafo light-text"><span className="negrita">Contraseña:</span>* * * * * * * *</p>
                                </div>
                            </div>
                            :
                            <div className="cabecera-usuario">
                                <div className="foto-usuario">
                                    {
                                        props.usuario.foto!=='' ? <img src={props.usuario.foto} alt="foto user"/>
                                        : <img src="../../assets/user.png" alt="foto user"/>
                                    }
                                    <p className="parrafo light-text">Editar Foto</p>
                                </div>
                                <div className="datos-usuario">

                                    <h3 className="light-text negrita">Datos Usuario</h3>
                                    <div className="fila">
                                        <p className="parrafo light-text"><span className="negrita">Nombre:</span>{props.usuario.nombre}</p>
                                    </div>
                                    <div className="fila">
                                        <p className="parrafo light-text"><span className="negrita">Apellido:</span></p>
                                        <input type="text" className="parrafo edit-data" defaultValue={props.usuario.apellido} ref={inputHandler} />
                                        <IoSend className="send light-text" onClick={() => confirmChangeApellido(inputHandler.current.value)} />
                                        <FaTrashAlt className="iconDelete light-text" onClick={() => setShowApellido(false)} />
                                    </div>
                                    <p className="parrafo light-text"><span className="negrita">Contraseña:</span>* * * * * * * *</p>
                                </div>
                            </div>
                        )
                    :
                    <div className="cabecera-usuario">
                        <div className="foto-usuario">
                            {
                                props.usuario.foto!=='' ? <img src={props.usuario.foto} alt="foto user"/>
                                : <img src="../../assets/user.png" alt="foto user"/>
                            }
                        </div>
                        <div className="datos-usuario">
                            <h3 className="light-text negrita">Datos Usuario</h3>
                            <div className="fila">
                                <p className="parrafo light-text"><span className="negrita">Nombre:</span>{props.usuario.nombre}</p>
                            </div>
                            <div className="fila">
                                <p className="parrafo light-text"><span className="negrita">Apellido:</span>{props.usuario.apellido}</p>
                            </div>
                            <div className="fila">
                                <p className="parrafo light-text"><span className="negrita">Contraseña:</span>* * * * * * * *</p>
                            </div>
                        </div>
                    </div>
                }

                <h4 className="negrita light-text">Mi Lista de Favoritas</h4>

                <div className="listado-favoritas">
                {
                    peliculas.length > 0 ?
                    peliculas.map((pelicula) => {
                        return (
                            <div key={pelicula.id}>
                                <Link to={`/Peliculas/${pelicula.id}`} style={{ textDecoration: 'none' }}>
                                    <CardFavorita key={pelicula.id} datos={pelicula} />
                                </Link>
                            </div>
                        )
                    })
                    :  <p className="">"Sin Favoritas."</p>
                }
                </div>

                <Link to={`/Peliculas`} className="no-decoration"><button className="btn btn-primary mb-3 bblue">Volver a Películas</button></Link>
            </div>
        )  
}
const mapDispatchToProps = {
    editUserData: usuarioActions.editarUsuario
}
const mapStateToProps = (state) => {
    return {
        usuario: state.usuarioReducer,
        token: state.usuarioReducer.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuario)
