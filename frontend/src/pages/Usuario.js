import React, {  useState,  useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import CardFavorita from "../components/CardFavorita/CardFavorita"



const Usuario = () => {
    
    const [peliculas, setPeliculas] = useState([])

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
        fetchearPorTendencia()
    },[])  

    console.log('estos son las peliculas:',peliculas)

        return (
            
            <div className="main-ficha">
            
                <h1 className="light-text">Vista Usuario</h1>
                <div className="cabecera-usuario">
                    <img src="../../assets/user.png" alt="foto user"/>
                    <div className="datos-usuario">

                        <h6 className="light-text negrita">Datos Usuario</h6>
                        <p className="parrafo light-text"><span className="negrita">Nombre:</span>User 1</p>
                        <p className="parrafo light-text"><span className="negrita">Apellido:</span>User 2</p>
                        <p className="parrafo light-text"><span className="negrita">Password:</span>XXXXX</p>
                        
                    </div>
                </div>

                <h3 className="negrita light-text">Mi Lista de Favoritas</h3>

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
export default Usuario
