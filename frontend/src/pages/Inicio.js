import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CardPeliculas from '../components/CardPeliculas/CardPeliculas'

const Inicio = () => {


    const [peliculas, setPeliculas] = useState([])

    useEffect(async()=>{
        try{

            const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=43fd83d3a9756a2f59b0de39480b3bf7&language=es-ES&page=1')
            setPeliculas(res.data.results)
        }catch(error){console.log(error)}
        },[])

    return  (
        <>
        <div className='d-flex flex-wrap justify-content-center'>

        { 
            peliculas.map((e,index)=>{
                return <CardPeliculas datos={e}/>
            })
        }
        </div>
        </>
    )
}

export default Inicio