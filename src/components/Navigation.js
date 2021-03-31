
// Importando react
import React, { Component } from 'react';

// Importando librerias
import styled from 'styled-components';

// Configurando los estilos de la barra de navegacion
const Nav = styled.div`

  /* Gradiente del fondo */
  background: #0F2027;
  background: -webkit-linear-gradient(to left, #2C5364, #203A43, #0F2027);
  background: linear-gradient(to left, #2C5364, #203A43, #0F2027);

  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-aling: center;
`;

// Configurando los estilos de el texto que esta en el navbar
const NavbarText = styled.div`
  color: white;
  font-size: 25px;
`;

// Componente de la Navegacion
class Navigation extends Component {

  // Renderizacion en la pantalla
  render() {
    return (

      <div className="navigation">

        <Nav>
            <NavbarText>
              <b>Bienvenido</b> Ingresa para ver más...
            </NavbarText>
        </Nav>

      </div>

    )
  }
}

// Exportando componente
export default Navigation;
