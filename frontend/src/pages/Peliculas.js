import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {Container,Pagination} from 'react-bootstrap'
import CardPeliculas from "../components/CardPeliculas";


const Peliculas = () => {
  const [peliculasDefault, setPeliculasDefault] = useState();
  const [peliculas, setPeliculas] = useState([]);
  const [genero, setGenero] = useState([]);

  const [generoSeleccionado, setGeneroSeleccionado] = useState(28);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  // referencia
  const buscadorPorNombre = useRef();



  // paginacion

  let items = [];
  for (let number = 1; number <= 10; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={()=> setPage(number)}>
        {number}
      </Pagination.Item>
    );
  }


  console.log(totalPages)

    



    // const api = 'https://api.themoviedb.org/3/discover/movie?api_key=43fd83d3a9756a2f59b0de39480b3bf7&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'

    const urlApi = 'https://api.themoviedb.org/3/'
    const apiKey = '43fd83d3a9756a2f59b0de39480b3bf7'

  // component did mount
  useEffect(async () => {
    try {
      const res = await axios.get(`${urlApi}discover/movie?api_key=${apiKey}&language=es-ES&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);
        console.log(res.data)
      setPeliculas(res.data.results);
      setPeliculasDefault(res.data.results);

      const generos = await axios.get(`${urlApi}genre/movie/list?api_key=${apiKey}&language=es-MX`);
      setGenero(generos.data.genres);
    } catch (err) {console.log(err);}
  }, []);

  // FUNCIONES
  const HandleGenero = (e) => setGeneroSeleccionado(e.target.value);

  const fetchear = async () => {
    try {
      const res = await axios.get(
        `${urlApi}discover/movie?api_key=${apiKey}&language=es-ES&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&with_genres=${generoSeleccionado}&with_watch_monetization_types=flatrate&language=es-MX`
      );
      setTotalPages(res.data.total_pages);
      setPeliculas(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchearPorNombre = async () => {
    let value = buscadorPorNombre.current.value;
    if (value.length > 2) {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=43fd83d3a9756a2f59b0de39480b3bf7&query=${value}&&language=es-MX`
        );
        console.log(res.data.results)
        setPeliculas(res.data.results);
      } catch (err) {
        console.log(err);
      }
    } else {
      setPeliculas(peliculasDefault);
    }
  };

  return (
    <Container>
      <h1 className="text-center">Peliculas</h1>

      <div className="d-flex justify-content-around">
        <input
          type="text"
          ref={buscadorPorNombre}
          placeholder="pelicula"
          onChange={fetchearPorNombre}
        />
        <form onChange={fetchear}>
          <select name="select" onChange={HandleGenero}>
            {genero.map((genero) => (
              <option value={genero.id}>{genero.name}</option>
            ))}
          </select>
        </form>
      </div>
     
      <div className="container-fluid d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {peliculas.map((pelicula) => {
          if (pelicula.overview && pelicula.backdrop_path) {
            return <CardPeliculas key={pelicula.id} datos={pelicula} />;
          }
        })}
      </div>

    </Container>
  );
};

export default Peliculas;
