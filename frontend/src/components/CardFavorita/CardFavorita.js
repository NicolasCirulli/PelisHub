import React from "react";


const CardFavorita = ({ datos }) => {

    let imagen
    if(datos.poster_path){
        imagen = `https://image.tmdb.org/t/p/w500/${datos.poster_path}`
    }else{
        imagen = './assets/nodisponible.png' 
    }

    /* console.log('dentro de la favorita',datos) */

    return (
            <div className="favorita">
                <img src={imagen} alt="favorita-foto"/>
                <div className="favorita-body">
                    <p className="negrita light-text favorita-titulo">{datos.title}</p>
                    <div className="datos-favorita">
                        <div className="values">
                            <img src="../../assets/gold-star.png" alt="star" />
                            <p className="negrita petit">{`Rating: ${datos.vote_average} / 10`}</p>
                        </div>
                        <div className="values">
                            <img src="../../assets/gold-like.png" alt="star" />
                            <p className="negrita petit">{`Votos: ${datos.vote_count} Likes`}</p>
                        </div>

                    </div>

                </div>
                
            </div>
    );
};

export default CardFavorita;
