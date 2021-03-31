
// Importar React
import React, { useState } from 'react';

// Importando librerias
import styled from 'styled-components';

// Importar iconos
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from 'react-icons/fa';

// Copnfigurando los estilos del contenedor
const ContenedorMain = styled.div`

  margin: 200px auto;
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

//
const Datos = styled.form`
  margin-top: -100px;
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

const HeaderMain = styled.div`
  position: relative;
  display: flex;
  text-aling: center;
  justify-content: center;
  align-items: center;
`;

const ImagenMain = styled.div`
  width: 150px;
  height: 150px;
  border: 4px black solid;
  border-radius: 5px;
  margin-bottom: 60px;
`;

const ImgMain = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
`;

const Descripcion = styled.p`
  margin-top: 3px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Nombre = styled.h2`
  margin-bottom: 10px;
`;

const BotonMain = styled.button`
  margin-top: 30px;
`;

const Titulo = styled.div`
  margin-top: 20px;
`;

// Copnfigurando los estilos del contenedor
const ContenedorEditar = styled.div`

  margin: 100px auto;
  margin-top: 70px;
  width: 1500px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 10px;
  height: 63vh;
  display: grid;

  background: #0F2027;
  background: -webkit-linear-gradient(to top, #2C5364, #203A43, #0F2027);
  background: linear-gradient(to top, #2C5364, #203A43, #0F2027);
  color: white;

  text-aling: center;
`;

const ImagenEditar = styled.div`
  width: 150px;
  height: 150px;
  border: 4px black solid;
  border-radius: 5px;
  margin-left: 150px;
  margin-bottom: 100px;
`;

const ImgEditar = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
`;

// Configurando el estilo de algunas entradas para que esten espaciadas entre si
const InputEspaciado = styled.div`
  margin-bottom: 30px;
`;

// Configurando los estilos de los mensajes de error
const Error = styled.span`
  color: red;
`;

// Configurando los estilos de los mensajes de actualizacion aprobada
const Update = styled.span`
  color: green;
`;

//  Declarando el componente
const PerfilPage = (props) =>  {

  const { fb, nombre, setNombre, nmrTelefono, setNmrTelefono, email, setEmail, password, setPassword, descripcion, setDescripcion, imgPerfil, setImgPerfil, facebook, setFacebook, twitter, setTwitter, instagram, setInstagram } = props;

  const [ bandera, setBandera ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ updateMsg, setUpdateMsg ] = useState('');

  const [ imagen, setImagen ] = useState([]);

  const handlePerfil = () => {
    setBandera(!bandera)
  };

  const handleUpdate = () => {
    if (!nombre || !nmrTelefono || !email || !password) {
      setErrorMsg("No se puede dejar espacios en blanco.");
      setUpdateMsg("");

    } else {
      setErrorMsg("");
      setUpdateMsg("Datos actualizados correctamente.");

      const subirImagen = fb.storage().ref("imagenesUsuarios/" + fb.auth().currentUser.uid).put(imagen);
      subirImagen.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error)
        },
        () => {
          fb.storage()
                    .ref("imagenesUsuarios")
                    .child(fb.auth().currentUser.uid)
                    .getDownloadURL()
                    .then(url => {
                      setImgPerfil(url);
                    })
        }
      )
      // console.log(imgPerfil)
      fb.database().ref('usuarios/' + fb.auth().currentUser.uid).set({
        nombre: nombre,
        nmrTelefono: nmrTelefono,
        email: email,
        password: password,
        descripcion: descripcion,
        imgPerfil: imgPerfil
      });

      if (email !== fb.auth().currentUser.email) {

        fb.auth().currentUser.updateEmail(email).then(function() {

          fb.database().ref('usuarios/' + fb.auth().currentUser.uid).set({
            nombre: nombre,
            nmrTelefono: nmrTelefono,
            email: email,
            password: password,
            descripcion: descripcion,
            imgPerfil: imgPerfil
          });

        }).catch(function(error) {
          setUpdateMsg("");
          switch (error.code) {
            case "auth/invalid-email":
              setErrorMsg("Dirección de correo no valida.");
              break;
            case "auth/email-already-in-use":
              setErrorMsg("Ese correo ya esta registrado.");
              break;
            case "auth/requires-recent-login":
              setErrorMsg("Para cambiar el correo se requiere un inicio de sesion reciente.");
              break;

            default:
              // Pasar
          };
        });
      };

      if (password !== fb.auth().currentUser.password) {
        fb.auth().currentUser.updatePassword(password).then(function() {

          fb.database().ref('usuarios/' + fb.auth().currentUser.uid).set({
            nombre: nombre,
            nmrTelefono: nmrTelefono,
            email: email,
            password: password,
            descripcion: descripcion,
            imgPerfil: imgPerfil
          });

        }).catch(function(error) {
          setUpdateMsg("");
          switch (error.code) {
            case "auth/weak-password":
              setErrorMsg("La contraseña debe tener 6 digitos o mas.");
              break;
            case "auth/requires-recent-login":
              setErrorMsg("Para cambiar la contraseña se requiere un inicio de sesion reciente.");
              break;
            default:
              // Pasar
          };
        });
      };

  }
}


  // Renderizacion
  return (

    <>
      {bandera?
        <ContenedorEditar>
          <Titulo><h1>Editar Datos Personales</h1></Titulo>

          <div className="row">

            <div className="col-md-1">
            </div>

            <div className="col-md-4">

              <div className="form-group">
                <ImagenEditar>
                  <ImgEditar src={ imgPerfil } id="img" />
                  <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
                </ImagenEditar>
              </div>

              <div className="form-group">
                <label>Nombre:⠀⠀⠀</label>
                <input className="form-control-sm" placeholder="Ingrese su nombre" autoFocus required value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Correo:⠀⠀⠀⠀</label>
                <input className="form-control-sm" placeholder="Ingrese su correo" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}  />
              </div>

              <div className="form-group">
                <label>Contraseña:⠀</label>
                <input className="form-control-sm" placeholder="Ingrese su contraseña" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)}  />
              </div>

              <div className="form-group">
                <label>Numero Telefonico:⠀</label>
                <input className="form-control-sm" placeholder="Ingrese su numero" autoFocus required value={nmrTelefono} onChange={(e) => setNmrTelefono(e.target.value)}  />
              </div>

            </div>

            <div className="col-md-2">
            </div>

            <div className="col-md-4">

              <InputEspaciado>
                <div className="form-group">
                  <label>Facebook:⠀</label>
                  <input className="form-control-sm" placeholder="Ingrese su pagina de facebook" autoFocus required value={facebook} onChange={(e) => setFacebook(e.target.value)}  />
                </div>
                <div className="form-group">
                  <label>Twitter:⠀⠀⠀</label>
                  <input className="form-control-sm" placeholder="Ingrese su pagina de twitter" autoFocus required value={twitter} onChange={(e) => setTwitter(e.target.value)}  />
                </div>
                <div className="form-group">
                  <label>Instagram:⠀</label>
                  <input className="form-control-sm" placeholder="Ingrese su pagina de instagram" autoFocus required value={instagram} onChange={(e) => setInstagram(e.target.value)}  />
                </div>
              </InputEspaciado>

              <InputEspaciado>
                <div className="form-group">
                  <label>Descripcion del Usuario: </label>
                  <textarea className="form-control" rows="5" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                </div>
              </InputEspaciado>

              <button className="btn btn-secondary" onClick={handlePerfil}>Vista Previa</button>
              <button className="btn btn-info" onClick={handleUpdate}>Actualizar Datos</button>

              <div>
                <Error>{errorMsg}</Error>
                <Update>{updateMsg}</Update>
              </div>

            </div>
          </div>

        </ContenedorEditar>
        :
        <ContenedorMain>
          <HeaderMain><h1>Datos Personales</h1></HeaderMain>

          <Datos>

            <ImagenMain>
              <ImgMain src={ imgPerfil } id="img" />
            </ImagenMain>

            <Nombre>{ nombre }</Nombre>
            <Descripcion>{ descripcion }</Descripcion>
            <h5><MdIcons.MdMail />{ email }</h5>
            <br/>
            <h6><MdIcons.MdCall />{ nmrTelefono }</h6>
            <h6><FaIcons.FaFacebook />{ facebook }</h6>
            <h6><AiIcons.AiFillTwitterCircle />{ twitter }</h6>
            <h6><AiIcons.AiFillInstagram />{ instagram }</h6>

            <BotonMain className="btn btn-info" onClick={handlePerfil}>Editar Datos</BotonMain>

          </Datos>
        </ContenedorMain>
      }
    </>

  )
};

// Exportando componente
export default PerfilPage;
