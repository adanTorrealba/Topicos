
// Importando react
import React, { useState } from 'react';

// Importando librerias
import styled from 'styled-components';
import {Modal, Button} from 'react-bootstrap';
import ReactPlayer from 'react-player';

 const ModalReproductorVideo = (props) => {

   const { show, onHide, enlace, nombre, categoria, subcategoria, plataforma } = props

  return (
    <Modal
      {...props}
      size="xl"
      centered
    >

      <Modal.Header closeButton>
        <Modal.Title>
          {nombre}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ReactPlayer
          url = {enlace}
          width = '1100px'
          height = '500px'
          controls
          playing
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-md-center">
        <h4>{categoria} / </h4>
        <h4>{subcategoria} / </h4>
        <h4>{plataforma}</h4>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalReproductorVideo;
