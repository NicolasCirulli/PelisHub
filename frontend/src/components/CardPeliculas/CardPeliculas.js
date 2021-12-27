import React from "react";

import {Card, Button} from 'react-bootstrap'

const CardPeliculas = ({ datos }) => {

    let imagen;
    if(datos.backdrop_path){
       imagen = `https://image.tmdb.org/t/p/w500/${datos.backdrop_path}`
    }else{
      imagen = './assets/nodisponible.png' 
    }


  return (
    <>
      <Card style={{ width: "18rem" , margin:'5px', borderRadios:'5px'}}>
        <Card.Img variant="top" src={imagen} />
        <Card.Body>
          <Card.Title>{datos.title || datos.original_name }</Card.Title>
          {/* <Card.Text>
            {datos.overview}
          </Card.Text> */}
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default CardPeliculas;
