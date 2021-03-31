
// Importando react
import React, { useState } from 'react';

// Importando librerias
import styled from 'styled-components';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

const Error = styled.span`
  margin-right: 15px;
  color: red;
`;

const Succes = styled.span`
  margin-right: 15px;
  color: green;
`;

 const ModalMensaje = (props) => {

   const {fb, show, onHide, nombreContacto, setNombreContacto, tlfContacto, setTlfContacto, emailContacto, setEmailContacto, mensajeContacto, setMensajeContacto } = props
   const [ error, setError ] = useState("");
   const [ succes, setSucces ] = useState("");

   const handleEnviar = () => {

     if (!nombreContacto || !tlfContacto || !emailContacto || !mensajeContacto) {
       setError("No se puede dejar casillas en blanco.");
       setSucces("");
     } else {
       setError("");

       const msg = {
         contacto: nombreContacto,
         correo: emailContacto,
         mensaje: mensajeContacto,
         status: "No leido",
         telefono: tlfContacto
       };

       fb.database().ref("mensajes").push(msg);
       setSucces("Mensaje enviado correctamente.");

       setNombreContacto("");
       setEmailContacto("");
       setTlfContacto("");
       setMensajeContacto("");

       onHide();

     };
   };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enviar Mensaje
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Rellene el siguiente formulario y le antederemos</h4>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={nombreContacto} placeholder="Ingrese su nombre" onChange={(e) => setNombreContacto(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control type="email" value={emailContacto} placeholder="Ingrese su correo electronico" onChange={(e) => setEmailContacto(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Numero de Telefono</Form.Label>
            <Form.Control type="text" value={tlfContacto} placeholder="Ingrese su numero telefonico" onChange={(e) => setTlfContacto(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={3} value={mensajeContacto} placeholder="Ingrese aqui su mensaje" onChange={(e) => setMensajeContacto(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Error>{error}</Error>
        <Succes>{succes}</Succes>
        <Button variant="info" type="submit" onClick={handleEnviar}>Enviar Mensaje</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMensaje;
