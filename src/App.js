
// Importar React
import React, { useState, useEffect } from 'react';

// Importando componentes
import Sidebar from './components/Sidebar';
import Form from './components/Form';

// Importando Firabase
import fb from './firebase-config';

// Importando css de botstrap
import 'bootstrap/dist/css/bootstrap.css';

// Importando la hoja de estilos
import './App.css';

function App() {

  // Declarando las variables de estado a utilizar
  const [ usuario, setUsuario ] = useState('');
  const [ nombre, setNombre ] = useState('');
  const [ errorNombre, setErrorNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ errorEmail, setErrorEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const [ validatePassword, setValidatePassword ] = useState('');
  const [ errorPassword, setErrorrPassword] = useState('');
  const [ errorPassword2, setErrorrPassword2 ] = useState('');
  const [ nmrTelefono, setNmrTelefono ] = useState('');
  const [ errorNmrTelefono, setErrorNmrTelefono ] = useState('');
  const [ descripcion ] = useState('');
  const imgPerfil='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const [ facebook, setFacebook ] = useState('');
  const [ twitter, setTwitter ] = useState('');
  const [ instagram, setInstagram ] = useState('');

  const [ mostrarModal, setMostrarModal ] = useState(false);

  // Declarando la funcion para verificar y mandar los datos del login
  const handleLogin = (e) => {

    e.preventDefault();   //Detener la actualizacion tipo submit por defecto
    inicializarErrores(); // Vaciar todos los errores

    // Verificar los errores y permitir el login-in
    fb
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
            setErrorEmail("Dirección de correo no valida.");
            break;

          case "auth/user-not-found":
            setErrorEmail("Este usuario no existe.");
            break;

          case "auth/wrong-password":
              setErrorrPassword("Clave incorrecta.");
            break;

          default:
            // Pasar
        }
      });
  };

  // Declarando la funcion para verificar los datos y registrarlos
  const handleRegister = (e) => {

    e.preventDefault();   //Detener la actualizacion tipo submit por defecto
    inicializarErrores(); // Vaciar todos los errores

    if (nombre && nmrTelefono) { //Validar si el nombre fue escrito

      if (isNaN(nmrTelefono)) {
        setErrorNmrTelefono("Solo se admiten caracteres numericos.")
      } else {
        // Verificar los errores y permitir el sign-up
        fb
          .auth()
          .createUserWithEmailAndPassword(email, validatePassword)
          .catch(err => {
            switch (err.code) {
              case "auth/email-already-in-use":
                setErrorEmail("Ese correo ya esta registrado.");
                break;
              case "auth/invalid-email":
                setErrorEmail("Dirección de correo no valida.");
                break;

              case "auth/weak-password":
                if (!password2) { //Verificar si no se ha escrito la confirmacion, y salta un error, es de la contraseña 1
                  if (!password) {setErrorrPassword("La contraseña debe contener minimo 6 dígitos.")}
                  else {setErrorrPassword2("La contraseña debe contener minimo 6 dígitos.")};
                } else {
                  setErrorrPassword2("Las contraseña no coinciden.");
                }

                break;

              default:
                // Pasar
            }
          });
      }


    //Mensaje de error de la validacion del nombre
    } else {
      if (!nmrTelefono && !nombre) {
        setErrorNombre("No debe dejar espacios vacíos.")
      } else if (nombre && !nmrTelefono) {
        setErrorNmrTelefono("No debe dejar espacios vacíos.")
      }
    }

  };

  // Declarando la funcion para logout
  const handleLogout = () => {
    inicializarErrores();
    inicializarInputs();
    fb.auth().signOut();
  };

  // Funcion para verificar si hay un usuario loggeado en el momento
  const verificarLogin = () => {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        if (nombre) {
          guardarDatos()
        };
        setUsuario(user);
      } else {
        setUsuario("");
      }
    });
  };

  useEffect(() => {verificarLogin();}, [password2]);

 // Incializar todas las entradas en un string vacio
 const inicializarInputs = () => {
   setNombre('');
   setEmail('');
   setPassword('');
   setPassword2('');
   setValidatePassword('');
   setNmrTelefono('');
 }

 // Inicializar todos los errores en un string vacio
 const inicializarErrores = () => {
   setErrorNombre('');
   setErrorEmail('');
   setErrorrPassword('');
   setErrorrPassword2('');
   setErrorNmrTelefono('');
 }

 // Funcion para validar que la primera y segunda contraseña coincidan
 const confirmPassword = (e) => {

   resetValidacion()  //Vaciar la validacion cada vez que se haga un cambio, y solo guardar datos cuando se verifique que coincidan
   setPassword2(e.target.value)

   if (password !== e.target.value) {
     setErrorrPassword2("Las contraseñas no coinciden.");
   } else {
     setValidatePassword(e.target.value);
     setErrorrPassword2('');
   }
 }

 // Funcion para inicilizar el valor de la validacion de la contraseña
 const resetValidacion = () => {
   setValidatePassword('');
 }

// Funcion para guardar los datos del usuario en la base de Datos
const guardarDatos = () => {
  fb.database().ref('usuarios/' + fb.auth().currentUser.uid).set({
    nombre: nombre,
    nmrTelefono: nmrTelefono,
    email: email,
    password: password,
    descripcion: descripcion,
    imgPerfil: imgPerfil,
    facebook: facebook,
    twitter: twitter,
    instagram: instagram
  });
}

const handleContacto = () => {
  setMostrarModal(! mostrarModal)
}

 // Renderizacion
  return (

    <div className="App">
      {usuario ?
        (<Sidebar handleLogout={handleLogout} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} handleContacto={handleContacto} />)
        :
        (<Form
            nombre={nombre}
            setNombre={setNombre}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            password2={password2}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            errorNombre={errorNombre}
            errorEmail={errorEmail}
            errorPassword={errorPassword}
            errorPassword2={errorPassword2}
            confirmPassword={confirmPassword}
            inicializarInputs={inicializarInputs}
            inicializarErrores={inicializarErrores}
            nmrTelefono={nmrTelefono}
            setNmrTelefono={setNmrTelefono}
            errorNmrTelefono={errorNmrTelefono}
        />)
      }

    </div>

  );
}

// Exportar
export default App;
