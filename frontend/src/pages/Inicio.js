import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CardPeliculas from '../components/CardPeliculas/CardPeliculas'
import { Carousel, Col, Card, Row,Container } from "react-bootstrap"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Inicio = () => {


    const [peliculas, setPeliculas] = useState([])
    console.log(peliculas[0])

    useEffect(async()=>{
        try{

            const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=43fd83d3a9756a2f59b0de39480b3bf7&language=es-ES&page=1')
            setPeliculas(res.data.results)
        }catch(error){console.log(error)}
        },[])
        const settings = {
            className: "center",
            centerMode: false,
            infinite: true,
            centerPadding: "3px",
            slidesToShow: 3,
            speed: 500,
            rows: 2,
            slidesPerRow: 2,
            autoplay: true,
            autoplaySpeed: 6000,
            dots: false,
            pauseOnHover: false,
            responsive:[
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
                }
              }
            ]
          };

    return  (
        <>

        <div>
            
        </div>
         <div className="contenedor-tarjeta">
      <h2>Mas vistas de la semana</h2>
        <Slider {...settings}>
          {peliculas.map((img, index)=>{
            return(
              <div key={index}  >
                <Card className="tarjeta">
                  <Card.Img className="img-tarjeta" variant="top" src={`https://image.tmdb.org/t/p/w500/${img.backdrop_path}`} />
                  <Card.Body className="cards-bodys">
                      <Card.Text >
                        <h6 className="cards-texto">{img.title}</h6>
                     </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            )
          }
          )}
        </Slider>
      </div>
        </>
    )
}

export default Inicio