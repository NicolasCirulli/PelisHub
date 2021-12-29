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
    const [shown, setShown] = useState(false)
    const inputHandler = useRef()

    const fetchearPorTendencia = async () => {
          try {
            const res = await axios.get(
              `https://api.themoviedb.org/3/trending/movie/week?api_key=43fd83d3a9756a2f59b0de39480b3bf7&language=es-ES`
            )
            console.log('el res del axios es:',res)
            setPeliculas(res.data.results)

          } catch (err) {
            setPeliculas([])
            console.log(err)
          }
    }

    useEffect(() => {
        setShown(false)
        fetchearPorTendencia()
    },[props.render])  


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
            }
        })
    }

    console.log('estos son las peliculas:',peliculas)

        return (
            
            <div className="main-ficha">
                {
                    props.usuario && (props.usuario.google!==true)
                    ?
                        !shown ? (
                            <div className="cabecera-usuario">
                                {
                                    props.usuario.foto!=='' ? <img src={props.usuario.foto} alt="foto user"/>
                                    : <img src="../../assets/user.png" alt="foto user"/>
                                }
                                <div className="datos-usuario">

                                    <h3 className="light-text negrita">Datos Usuario</h3>
                                    <div className="fila">
                                        <p className="parrafo light-text"><span className="negrita">Nombre:</span>{props.usuario.nombre}</p>
                                        <FaPencilAlt className="iconEdit light-text" onClick={() => setShown(!shown)} />
                                    </div>
                                    <p className="parrafo light-text"><span className="negrita">Apellido:</span>{props.usuario.apellido}</p>
                                    <p className="parrafo light-text"><span className="negrita">Contraseña:</span>{props.usuario.contrasenia}</p>
                                    
                                </div>
                            </div>
                        )
                        : (
                            <div className="cabecera-usuario">
                                {
                                    props.usuario.foto!=='' ? <img src={props.usuario.foto} alt="foto user"/>
                                    : <img src="../../assets/user.png" alt="foto user"/>
                                }
                                <div className="datos-usuario">

                                    <h6 className="light-text negrita">Datos Usuario</h6>
                                    <div className="fila">
                                        <p className="parrafo light-text"><span className="negrita">Nombre:</span></p>
                                        <input type="text" className="parrafo edit-data" defaultValue={props.usuario.nombre} ref={inputHandler} />
                                        <IoSend className="send light-text" onClick={() => confirmChange(inputHandler.current.value)} />
                                    </div>
                                    <p className="parrafo light-text"><span className="negrita">Apellido:</span>{props.usuario.apellido}</p>
                                    <p className="parrafo light-text"><span className="negrita">Contraseña:</span>{props.usuario.contrasenia}</p>
                                    
                                </div>
                            </div>
                        )
                    :
                        <div className="cabecera-usuario">
                            {
                                props.usuario.foto!=='' ? <img src={props.usuario.foto} alt="foto user"/>
                                : <img src="../../assets/user.png" alt="foto user"/>
                            }
                            <div className="datos-usuario">

                                <h6 className="light-text negrita">Datos Usuario</h6>
                                <p className="parrafo light-text"><span className="negrita">Nombre:</span>{props.usuario.nombre}</p>
                                <p className="parrafo light-text"><span className="negrita">Apellido:</span>{props.usuario.apellido}</p>
                                <p className="parrafo light-text"><span className="negrita">Contraseña:</span>{props.usuario.contrasenia}</p>
                                
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuario)
