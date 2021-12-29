import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card} from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carruselone = () => {
  const [peliculas, setPeliculas] = useState([]);
 

  useEffect(async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=43fd83d3a9756a2f59b0de39480b3bf7&language=es-ES&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=free"
      );
      setPeliculas(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 8,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          slidesPerRow: 1,
          rows: 2,
          dots: false,
          arrows: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 6000,
        },
      },
    ],
  };

  return (
    <>
      <div className="contenedor-tarjeta">
        <h2>Recomendadas</h2>
        <Slider {...settings}>
          {peliculas.map((img, index) => {
            return (
              <div key={index}>
                <Card className="tarjeta">
                  <Card.Img
                    className="img-tarjeta"
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w300/${img.poster_path}`}
                  />
                  <Card.Body className="cards-bodys"></Card.Body>
                </Card>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Carruselone;
