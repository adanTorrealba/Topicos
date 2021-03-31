
// Importando react
import React from 'react';

// Importando librerias
import styled from 'styled-components';

const Titulo = styled.div`
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const GaleriaImgPage = () => {
  return (
      <Titulo><h1>Galeria de Imagenes</h1></Titulo>
  )
};

export default GaleriaImgPage;
