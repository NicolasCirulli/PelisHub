import React, {  useState,  useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect, useSelector,useDispatch } from 'react-redux';
import Comments from "../components/Comments/Comments"
import usuarioActions from "../redux/actions/usuarioActions";


const Ficha = (props) => {

    const dispatch = useDispatch()

    const parameters = useParams()
    const [pelicula, setPelicula] = useState([]);
    const [productor, setProductor] = useState('');
    const [generos, setGeneros] = useState([]);
    const [videos, setVideos] = useState([]);
    const [favorita,setFavorita] = useState(false);
 
   const likeadas = useSelector(state => state.usuarioReducer.peliculasLikeadas)
   const idUsuario = useSelector(state => state.usuarioReducer._id)

   useEffect(() => { 
    likeadas.includes(parameters.id) 
    ? setFavorita(true)
    : setFavorita(false)
   }, [likeadas])

   const handleLike = () =>{
    dispatch(usuarioActions.agregarAFavoritos(idUsuario,parameters.id))
   }



    const videosPorId = async (id) => {
        if (id > 2) {
            try {
              const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=43fd83d3a9756a2f59b0de39480b3bf7&language=es-EN`
              )
              setVideos(res.data.results)

            } catch (err) {
              console.log(err)
            }
          } else {
            setPelicula({})
          }
    }
    const fetchearPorId = async (id) => {
        if (id > 2) {
          try {
            const res = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=43fd83d3a9756a2f59b0de39480b3bf7&language=es-MX`
            )
            console.log(res)
            setPelicula(res.data)
            setProductor(res.data.production_companies[0].name)
            setGeneros(res.data.genres)

          } catch (err) {
            console.log(err)
          }
        } else {
          setPelicula({})
        }
    }

    useEffect(() => {
        fetchearPorId(parameters.id)
        videosPorId(parameters.id)
    },[])  

    let imagen;
    if(pelicula.poster_path){
        imagen = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`
    }else{
        imagen = './assets/nodisponible.png' 
    }
    
    let lenguaje
    switch(pelicula.original_language) {
        case 'en':
            lenguaje = "Inglés";
            break;
        case 'es':
            lenguaje = "Español";
            break;
        case 'fr':
            lenguaje = "Francés";
            break;
        default:
            lenguaje = "Sin Información";
            break;
    }
    let trailers = videos.filter((e) => 
    e.type==="Trailer"&&e.site==="YouTube")

  console.log('estos son los parametros:',parameters)

  const cambiarFavorita = async () => {
      if (favorita===true) {
        setFavorita(false)
      } else {
        setFavorita(true)
      }
  }
        return (
            <div className="main-ficha">
                <div className="cabecera">
                    <img src={imagen} alt="poster pelicula"/>
                    <div className="datos-ficha">
                <h1 className="light-text h1-pelicula">{pelicula.title}</h1>
                        <h4 className="light-text negrita">Sinopsis</h4>
                        <p className="parrafo light-text">{pelicula.overview}</p>
                        <p className="parrafo light-text"><span className="negrita">Fecha de Estreno:</span>{pelicula.release_date}</p>
                        <p className="parrafo light-text"><span className="negrita">Título Original:</span>{pelicula.original_title}</p>
                        <p className="parrafo light-text"><span className="negrita">Productor:</span>{productor}</p>
                        <p className="parrafo light-text"><span className="negrita">Géneros:</span>
                        {
                                generos.length > 0 ?
                                generos.map((e,i) => {
                                    return (i<(generos.length-1) ? (e.name+", ")
                                    : (e.name+"."))
                                })
                                :  "Sin clasificación."
                        }
                        </p>
                        <p className="parrafo light-text"><span className="negrita">Lenguaje Original:</span>{lenguaje}</p>
                    </div>
                </div>
                <div className="rating light-text">
                    <img src="../../assets/gold-star.png" alt="star" />
                    <h6 className="negrita">{`Rating: ${pelicula.vote_average} / 10`}</h6>
                    <pre>   </pre>
                    <img src="../../assets/gold-like.png" alt="star" />
                    <h6 className="negrita">{`Votos: ${pelicula.vote_count} Likes`}</h6>
                    <pre>   </pre>
                    {
                        favorita ? 
                        <>
                            <img type="button" onClick={handleLike} src="../../assets/full-heart.png" alt="star" />
                            <h6 type="button" onClick={handleLike} className="negrita">Agregada en mis favoritas</h6>
                        </>
                        :
                        <>
                            <img type="button" onClick={handleLike} src="../../assets/empty-heart.png" alt="star" />
                            <h6 type="button" onClick={handleLike} className="negrita">Agregar a mis favoritas</h6>
                        </>
                    }
                </div>
                <h3 className="light-text trailer-title">Trailer</h3>
                {   
                    trailers.length>0 ?
                        <iframe src={`https://www.youtube.com/embed/${trailers[0].key}`}
                            frameborder='0'
                            allow='autoplay; encrypted-media'
                            allowfullscreen
                            title='video'
                        />
                    :  <h5 className="negrita warning-text">Sin Trailer en Español.</h5>
                }
                <h4 className="negrita light-text mt-4">Comentarios</h4>
                <Comments peliculaId={pelicula.id} peliculaDatos={pelicula}/>

                <Link style={{margin: '5%'}} to={'/Peliculas'}>
                <span className="volverPelicula"><a></a></span>
                </Link>

               
                
            </div>
        )  
}
export default Ficha
