
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

const GaleriaPage = () => {
  return (
      <Titulo><h1>Galeria</h1></Titulo>
  )
};

export default GaleriaPage;
