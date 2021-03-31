
// Importando React
import React from 'react'

// Importar iconos
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";

// Importando librerias
import styled from 'styled-components';

// Configurnado los estilos del contenedor del footer
const Contenedor = styled.div`
  background: #081115;
  position: relative;
  height: 210px;
  margin: 0 auto;
`;

// Configurando los estilos del texto del footer
const FooterText = styled.div`
  color: white;
`;

// Margen superior
const MarginTop = styled.div`
  margin-top: 20px;
`;

// Boton para las redes sociales
const Boton = styled.a`
  background: #081115;
  color: white;
  font-size: 1.5rem;
  margin-right: 5px;

  &:hover {
    color: white;
    font-size: 1.8rem;
  }
`;

// Declarando componente
const Footer = () => {

  // Renderizacion
  return (

    <Contenedor>

    <FooterText>
      <MarginTop>
        <h4>Contacto</h4>
      </MarginTop>
    </FooterText>

    <FooterText>
      <div className = "row">

        <div className="col-md-3">
        </div>

        <div className="col-md-3">
          <MarginTop>
            <h5>Adan Torrealba</h5>
            <h6><FaIcons.FaIdCard /> 27-726-442</h6>
            <h6><MdIcons.MdMail /> Adan_e_Torrealba@hotmail.com</h6>

            <div className="btn-group">
              <Boton href="https://www.facebook.com"><FaIcons.FaFacebook /></Boton>
              <Boton href="https://twitter.com/__Eduart__"><AiIcons.AiFillTwitterCircle /></Boton>
              <Boton href="https://www.instagram.com/_eduart/?hl=es-la"><AiIcons.AiFillInstagram /></Boton>
            </div>
          </MarginTop>
        </div>

        <div className="col-md-3">
          <MarginTop>
            <h5>Sebastian Alvarez</h5>
            <h6><FaIcons.FaIdCard /> 26-900-740</h6>
            <h6><MdIcons.MdMail /> sebalvarezch@gmail.com</h6>

            <div className="btn-group">
              <Boton href="https://twitter.com/pranksterfella"><FaIcons.FaFacebook /></Boton>
              <Boton href="https://twitter.com/pranksterfella"><AiIcons.AiFillTwitterCircle /></Boton>
              <Boton href="https://www.instagram.com/sebas.aac/"><AiIcons.AiFillInstagram /></Boton>
            </div>
          </MarginTop>
        </div>

      </div>

    </FooterText>

    <FooterText>
      <h6>Copyright 2021</h6>
    </FooterText>

    </Contenedor>
  )
}

// Exportando el componente
export default Footer;
