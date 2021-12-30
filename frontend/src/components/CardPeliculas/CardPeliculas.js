import React from "react";

import {Card, Button} from 'react-bootstrap'

const CardPeliculas = ({ datos }) => {

    let imagen;
    let estilos;
    if(datos.backdrop_path){
       imagen = `https://image.tmdb.org/t/p/w500/${datos.backdrop_path}`
      }else if(datos.poster_path){
      imagen = `https://image.tmdb.org/t/p/w500/${datos.poster_path}`
      estilos = {
        overflow: 'hidden',
        objectFit: 'cover',
        flex: 6
      }
    }else{
      imagen = './assets/nodisponible.png' 
      estilos = {
        overflow: 'hidden',
        objectFit: 'cover',
        flex: 6
      }

    }


  return (
    <>
      <Card className="card-pelis">
        <Card.Img variant="top" src={imagen} style={estilos} />
        <Card.Body>
          <Card.Title className="tituloPelicula">{datos.title || datos.original_name }</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardPeliculas;
