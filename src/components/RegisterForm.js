
// Importar React
import React from 'react';

// Importando iconos para el registro de las redes sociales
import * as TiIcons from "react-icons/ti";

// Importando librerias
import styled from 'styled-components';

// Configurando los estilos de el contenedor del formulario
const Contenedor = styled.div`
  border-radius: 0 10px 10px 0;
  position: relative;
`;

// Configurando los estilos de la cabecera del formulario
const Header = styled.div`
  position: relative;
  top: 10%;
  display: flex;
  text-aling: center;
  justify-content: center;
  align-items: center;
`;

// Configurando los estilos de el formulario
const Formulario = styled.form`
  position: relative;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-aling: center;
`;

// Configurando los estilos de los mensajes de error
const Error = styled.span`
   color: red;
`;

const Icon = styled.span`
  margin-right: 4px;
  font-size: 2.5rem;
  background-color: #0F2027;
  border-radius: 10px;

  &:hover {
    background-color: black;
  }
`;

// Declarando el componente
const RegisterForm = (props) => {

  // Recibiendo todas las variables y funciones declaradas en App.js
  const { nombre, setNombre, email, setEmail, password, setPassword, password2, handleRegister, errorNombre, errorEmail, errorPassword, errorPassword2, confirmPassword, nmrTelefono, setNmrTelefono, errorNmrTelefono } = props;

  // Renderizacion
  return (

    <Contenedor>

      <Header><h1>Registrarse</h1></Header>

      <Formulario>

        <div className="form-group">
          <label>Nombre</label>
          <input className="form-control" id="nombre-form" placeholder="Ingrese su nombre" autoFocus required value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <Error>{errorNombre}</Error>
        </div>

        <div className="form-group">
        <label>Número Telefónico</label>
        <input className="form-control" id="tlf-form" placeholder="Ingrese su número telefónico" autoFocus required value={nmrTelefono} onChange={(e) => setNmrTelefono(e.target.value)} />
        <Error>{errorNmrTelefono}</Error>
        </div>

        <div className="form-group">
          <label>Correo</label>
          <input type="email" id="email-form" className="form-control" placeholder="Ingrese su correo" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Error>{errorEmail}</Error>
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" id="password-form" className="form-control" placeholder="Ingrese su contraseña" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
          <Error>{errorPassword}</Error>
        </div>

        <div className="form-group">
          <label>Confirmar Contraseña</label>
          <input type="password" id="password-confirm-form" className="form-control" placeholder="Ingrese su contraseña" autoFocus required value={password2} onChange={confirmPassword} />
          <Error>{errorPassword2}</Error>
        </div>

        <div className="form-group">
          <Icon><TiIcons.TiSocialGooglePlus/></Icon>
          <Icon><TiIcons.TiSocialFacebook/></Icon>
          <Icon><TiIcons.TiSocialTwitter/></Icon>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox"/>
            <label className="form-check-label" htmlFor="gridCheck">
              Recuerdame
            </label>
          </div>
        </div>

        <button onClick={handleRegister} className="btn btn-info" id="boton-register">Registrarme</button>

      </Formulario>
    </Contenedor>

  )

};

// Exportando componente
export default RegisterForm;
