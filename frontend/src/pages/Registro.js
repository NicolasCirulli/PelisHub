import * as React from 'react';
import { Form, Button } from 'react-bootstrap'



const Registro = () => {
  return (
    <Form className="d-flex flex-column form-container" variant="light">

    <h1      className="text-light mb-5">Iniciar Sesion</h1>

        <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
          <Form.Label     className="text-light">Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" />
        </Form.Group>

        <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
          <Form.Label    className="text-light">Apellido</Form.Label>
          <Form.Control type="email" placeholder="Apellido" />
        </Form.Group>

        <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
          <Form.Label   className="text-light">Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3 col-5" controlId="formBasicPassword">
          <Form.Label  className="text-light">Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>
        
        <Form.Group className="mb-3 col-5" controlId="formBasicPassword">
          <Form.Label className="text-light">URL de imagen</Form.Label>
          <Form.Control type="password" placeholder="Imagen" />
        </Form.Group>

        <Button className="button-send"  type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Enviar
      </Button>
</Form>
  )
}

export default Registro