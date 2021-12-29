import React, { useState, useEffect } from "react";
import axios from "axios";
import {Card } from "react-bootstrap";
import logo from "../CardPeliculas/logo.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

const Carruseldos = () => {
  const [peliculas, setPeliculas] = useState([]);
  console.log(peliculas[0])

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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "center",
    centerMode: false,
    infinite: true,

    dots: true,
    fade: true,

    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "10px",
    rows: 1,
    slidesPerRow: 1,
    autoplay: true,
    autoplaySpeed: 9999,
    fede: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow: 1,
          rows: 1,
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
        <h2 className="titulo-destacadas">Mas destacadas</h2>
      <div className="contenedor-tarjeta">
        <Slider {...settings}>
          {peliculas.map((img, index) => {
            return (
              <div key={index} className="tarjeta-1">
                <Card className="tarjeta">
                  <Card.Img
                    className="img-tarjeta2"
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w1280/${img.backdrop_path}`}
                  />
                  <Card.Body className="cards-bodys"></Card.Body>
                </Card>
                <div className="descripcion-peli">
                <h2 className="h2">{img.title}</h2>
                <h3 className="h3">{img.overview}</h3>

                </div>
              </div>
            );
        })}
        </Slider>
      </div>
    </>
  );
};

export default Carruseldos;
