import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Pagination } from "react-bootstrap";
import CardPeliculas from "../components/CardPeliculas/CardPeliculas";

import { Link } from "react-router-dom";

const Peliculas = () => {
  const [peliculasDefault, setPeliculasDefault] = useState();
  const [peliculas, setPeliculas] = useState([]);
  const [genero, setGenero] = useState([]);

  const [generoSeleccionado, setGeneroSeleccionado] = useState(28);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // referencia
  const buscadorPorNombre = useRef();

  // paginacion

  let items = [];
  for (let number = page; number <= page + 5; number++) {
    number <= totalPages &&
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
  }

  useEffect(() => {
    fetchear();
    buscadorPorNombre.current.value = "";
  }, [page]);

  useEffect(() => {
    fetchear();
    setPage(1);
    buscadorPorNombre.current.value = "";
  }, [generoSeleccionado]);

  const urlApi = "https://api.themoviedb.org/3/";
  const apiKey = "43fd83d3a9756a2f59b0de39480b3bf7";

  // component did mount
  useEffect(async () => {
    try {
      const res = await axios.get(
        `${urlApi}discover/movie?api_key=${apiKey}&language=es-ES&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
      );
      console.log(res.data);
      setPeliculas(res.data.results);
      setPeliculasDefault(res.data.results);

      const generos = await axios.get(
        `${urlApi}genre/movie/list?api_key=${apiKey}&language=es-MX`
      );
      setGenero(generos.data.genres);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // FUNCIONES
  const HandleGenero = (e) => setGeneroSeleccionado(e.target.value);

  const fetchear = async () => {
    try {
      const res = await axios.get(
        `${urlApi}discover/movie?api_key=${apiKey}&language=es-ES&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&with_genres=${generoSeleccionado}&with_watch_monetization_types=flatrate&language=es-MX`
      );
      if (res.data.total_pages < 450) {
        setTotalPages(res.data.total_pages);
      } else {
        setTotalPages(450);
      }
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
      <h1 className="titulo-pelis">Peliculas</h1>

      <div className="buscar-pelis">
        <input
        className="input-pelis"
          type="text"
          ref={buscadorPorNombre}
          placeholder="pelicula"
          onChange={fetchearPorNombre}
        />
        <form onChange={fetchear} >
          <select name="select" onChange={HandleGenero} className="form-genero">
            {genero.map((genero) => (
              <option value={genero.id}>{genero.name}</option>
            ))}
          </select>
        </form>
      </div>

      <div className="pelisAll">
        {peliculas.map((pelicula) => {
          return(
            <div key={pelicula.id}>
                <Link to={`/Peliculas/${pelicula.id}`} className="subtitulo-pelis">
                    <CardPeliculas key={pelicula.id} datos={pelicula} />
                </Link>
            </div>
        )
        })}
      </div>
        {totalPages > 1 && (
          <div className="pasar-pagina">
            <Pagination>
              <Pagination.First onClick={() => setPage(1)} />
              <Pagination.Prev
                onClick={() => setPage(page < 2 ? page : page - 1)}
              />
              {items}
              <Pagination.Next
                onClick={() => setPage(page > totalPages ? page : page + 1)}
              />
              <Pagination.Last onClick={() => setPage(totalPages - 5)} />
            </Pagination>
          </div>
        )}
    </Container>
  );
};

export default Peliculas;
