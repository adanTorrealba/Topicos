
// Importar React
import React, { useState } from 'react';

// Importando librerias
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

// Importando componentes de clase
import Navigation from './Navigation'
import Footer from './Footer'

// Importando componentes funcionales
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

// Copnfigurando los estilos del contenedor del formulario
const Contenedor = styled.div`

  margin: 100px auto;
  margin-top: 50px;
  width: 500px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 10px;
  height: 850px;
  display: grid;

  background: #0F2027;
  background: -webkit-linear-gradient(to top, #2C5364, #203A43, #0F2027);
  background: linear-gradient(to top, #2C5364, #203A43, #0F2027);
  color: white;

  text-aling: center;
`;

// Configurando los estilos de la parte inferior del contenedor, donde estara el toggle apara cambiar login/register
const FooterForm = styled.span`
  position: relative;
  top: 18%;
  display: flex;
  text-aling: center;
  justify-content: center;
  align-items: center;
`;

//  Declarando el componente
const Form = (props) =>  {

  // Obteniendo todas las variables y funciones definidas en App.js
  const { nombre, setNombre, email, setEmail, password, setPassword, password2, handleLogin, handleRegister, errorNombre, errorEmail, errorPassword, errorPassword2, confirmPassword, inicializarInputs, inicializarErrores, nmrTelefono, setNmrTelefono, errorNmrTelefono, setErrorNmrTelefono  } = props;

  // Declarando variable de estado
  const [toggle, setToggle] = useState('');

  // Declarando la funcion para cambiar entre login/register, vaciando todos los campos
  const handleToggle = () => {
    setToggle(!toggle);
    inicializarInputs();
    inicializarErrores();
  }

  // Renderizacion
  return (
    <>
      <Navigation/>
      <Contenedor>

        <Router>
        {toggle ?
          <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} errorEmail={errorEmail} errorPassword={errorPassword} />
          :
          <RegisterForm nombre={nombre} setNombre={setNombre} email={email} setEmail={setEmail} password={password} setPassword={setPassword} password2={password2} handleRegister={handleRegister} errorNombre={errorNombre} errorEmail={errorEmail} errorPassword={errorPassword} errorPassword2={errorPassword2}  confirmPassword={confirmPassword} nmrTelefono={nmrTelefono} setNmrTelefono={setNmrTelefono} errorNmrTelefono={errorNmrTelefono} setErrorNmrTelefono={setErrorNmrTelefono}/>}

        <FooterForm>
          {toggle ?
            <>
              ¿No tienes una cuenta? Registrate
              <Link to="#" onClick={ handleToggle }>⠀aqui.</Link>
            </>
            :
            <>
              ¿Ya estás registrado? Ingresa
              <Link to="#" onClick={ handleToggle }>⠀aqui.</Link>
            </>
          }
        </FooterForm>
        </Router>

      </Contenedor>
      <Footer/>
    </>
  )
};

// Exportando componente
export default Form;
