import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import "./admin.css";

import axios from "axios";

const Admin = () => {

    const preFetch = [
        {

        'nombre' : 'asd',
        'apellido' : 'asd',
        'mail' : 'asd',
        'foto' : 'asd',

        }
    ]

  const [usuarios, setUsuarios] = useState(preFetch);
  const [loading, SetLoading] = useState(false)

  const borrarUsuario = async(id)=>{
    SetLoading(false)
    try{
        const respuesta = await axios.delete("http://localhost:4000/api/user/"+id);
        setUsuarios(respuesta.data.respuesta)
        SetLoading(true)
    }catch(err){
        console.log(err)
        SetLoading(true)
        }
  }


  const Fila = ({datos})=>{
      return (

            <tr>
                <td><img src={datos.foto} alt='imagen' width='50' height='50'/></td>
                <td>{datos.nombre}</td>
                <td>{datos.apellido}</td>
                <td>{datos.mail}</td>
                <td className="box-icono"> <AiFillDelete onClick={()=> borrarUsuario(datos._id)}  className="icono-admin" /> </td>
            </tr>
          
        )
      
  }


  useEffect(async () => {
    try {
      const listaUsuarios = await axios.get(
        "http://localhost:4000/api/usuarios"
      );
      setUsuarios(listaUsuarios.data.response);
      SetLoading(true)
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="prueba">
        <h2>Panel de admin</h2>
        <p>Total de usuarios : {loading && usuarios.length}</p>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>foto</th>
                <th>Nombre</th>
                <th>apellido</th>
                <th>mail</th>
                <th>borrar</th>
              </tr>
            </thead>
            <tbody>
             
             {usuarios.map(usuario => <Fila datos={usuario}/>)}
              
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Admin;
