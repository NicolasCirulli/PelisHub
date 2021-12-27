import * as React from 'react';
import { Form, Button } from 'react-bootstrap'



const Registro = () => {
  return (
    <Form className="d-flex flex-column form-container" variant="light">
    <h1>Iniciar Sesion</h1>
        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3 col-6" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="secondary" type="submit" className="col-2">
          Submit
        </Button>
</Form>
  )
}

export default Registro