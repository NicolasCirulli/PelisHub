import React from "react";

import {Card, Button} from 'react-bootstrap'

const CardPeliculas = ({ datos }) => {

    let imagen = `https://image.tmdb.org/t/p/w500/${datos.backdrop_path}`

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imagen} />
        <Card.Body>
          <Card.Title>{datos.original_title}</Card.Title>
          <Card.Text>
            {datos.overview}
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default CardPeliculas;
