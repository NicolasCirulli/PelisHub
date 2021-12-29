import React from "react";



const Card = () => {
  let imagen;
  if (datos.backdrop_path) {
    imagen = `https://image.tmdb.org/t/p/w500/${datos.backdrop_path}`;
  } else {
    imagen = "./assets/nodisponible.png";
  }

  return (
    <>
      <div className="wrapper">
  <div className="app">
    <div className="card">
      <img src={imagen} alt="" />
      <div>
        <h2>{datos.title || datos.original_name}</h2>
       
      </div>
    </div>
  </div>
</div>;

    </>
  );
};

export default Card;
