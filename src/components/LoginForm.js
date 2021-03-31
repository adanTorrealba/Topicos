
// Importar React
import React from 'react';

// Importando librerias
import styled from 'styled-components';

// Configurando los estilos del contenedor del formulario
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
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-aling: center;
`;

//  Configurando los estilos de el boton para logear
const Boton = styled.div`
  top: 10%;
`;

// Configurando los estilos de los mensajes de error
const Error = styled.span`
   color: red;
`;

// Declarando el componente
const Login = (props) => {

  // Recibiendo todas las variables y funciones declaradas en App.js
  const { email, setEmail, password, setPassword, handleLogin, errorEmail, errorPassword  } = props;

  // Renderizacion
  return (

    <Contenedor>

      <Header>
        <h1>Iniciar Sesion</h1>
      </Header>

      <Formulario id="formulario-login">

      <div className="form-group">
        <label>Correo Electronico</label>
        <input type="email" className="form-control" placeholder="Ingrese su correo" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Error>{errorEmail}</Error>
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input type="password" id="contraseña" nombre="contraseña" className="form-control" placeholder="Ingrese su contraseña" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Error>{errorPassword}</Error>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input className="form-check-input" type="checkbox"/>
          <label className="form-check-label" htmlFor="gridCheck">
            Recuerdame
          </label>
        </div>
      </div>

      <Boton>
        <button onClick={handleLogin} className="btn btn-info">Iniciar sesion</button>
      </Boton>

      </Formulario>

    </Contenedor>
  )

};

// Exportando componente
export default Login;
