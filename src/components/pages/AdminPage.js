
// Importando react
import React, { useState, useEffect } from 'react';

// Importando librerias
import styled from 'styled-components';

// Importando el componente modal
import ModalMensaje from '../ModalMensaje'
import ModalReproductorVideo from '../ModalReproductorVideo'

// Importando iconos
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";

const Parallax = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: url("https://w.wallhaven.cc/full/p2/wallhaven-p2m2ke.jpg");

  min-height: 500px;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Parallax2 = styled.div`
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: center;
  background-image: url("https://w.wallhaven.cc/full/j8/wallhaven-j81o8p.jpg");
  min-height: 500px;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const EspacioBlanco = styled.div`
  margin-top: 50px;
  height: 30vh;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  margin-right: 30px;

`;
const ContenedorDatos = styled.div`
  background-color: #0F2027;

  color: white;
  height: 160px;
  margin-top: -20px;
`;

const Titulo = styled.h1`
  color: white;
  text-shadow: 5px 5px 5px #000000;
  font-size: 450%;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin-left: -5px;
  margin-right: -17px;
`;

const EspacioDatos = styled.div`
  margin-left: -20px;
`;

const ContenedorObjetivo = styled.div`
  background-color: #0F2027;
  color: white;
  height: 250px;

  &: hover {
    opacity: 0.95;
    transition: .5s ease;
  }

  &:  hover h2 {
    font-size: 2.5rem;
    transition: .5s ease;
  }

  &: hover h3 {
    font-size: 2.5rem;
    transition: .5s ease;
  }
`;

const ContenedorContacto = styled.div`
  background-color: #203A43;
  color: white;
  height: 250px;

  &: hover {
    opacity: 0.95;
    transition: .5s ease;
  }

  &: hover button {
    opacity: 1;
  }

  &:  hover h2 {
    font-size: 2.5rem;
    transition: .5s ease;
  }

  &: hover h3 {
    font-size: 2.5rem;
    transition: .5s ease;
  }

`;

const ContenedorServicio = styled.div`
  background-color: #2C5364;
  color: white;
  height: 250px;

  &: hover {
    opacity: 0.95;
    transition: .5s ease;
  }

  &:  hover h2 {
    font-size: 2.5rem;
    transition: .5s ease;
  }

  &: hover h3 {
    font-size: 2.5rem;
    transition: .5s ease;
  }
`;

const BotonContacto = styled.button`
  margin-top: 30px;
  margin-left: 117px;
  transition: .5s ease;
  opacity: 0;
  filter: opacity(.6);
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);

  &: hover {
    font-size: 1.2rem;
    filter: opacity(1);
  }
`;

const H2 = styled.h2`
  transition: .5s ease;
`;
const H3 = styled.h2`
  transition: .5s ease;
`;

const Portafolio = styled.div`
  display: block;
  height: 91vh;
  align-items: center;
  justify-content: center;
`;

const ContenedorImagen = styled.div`
  overflow: hidden;
  margin-bottom: -20px;
  margin-right: -10px;

  &: hover button {
    opacity: 1;
  }
`;

const Img = styled.img`
  width: 500px;
  height: 300px;
  transition: transform .5s ease-in-out;

  &: hover {
    opacity: 0.6;
    transform: scale(3) rotate(25deg);
  }
`;

const BotonPortafolio = styled.button`
  margin-top: -200px;
  margin-left: 117px;
  transition: .5s ease;
  opacity: 0;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);

  &: hover {
    font-size: 1.2rem;
    filter: opacity(1);
  }
`;

const H1 = styled.h1`
  margin-top: 50px;
`;
const Subtitulo = styled.h5`
  margin-bottom: 50px;
`;

const AdminPage = (props) => {

  const { fb, mostrarModal, setMostrarModal, handleContacto } = props;

  const adanID = "3rI1tG3cRKUhEPvMAVsTiNed7yM2";
  const sebasID = "8QkUF41WragGy48IHJXFp1DnLnP2";

  const [ nombreAdan, setNombreAdan ] = useState("");
  const [ nombreSebas, setNombreSebas ] = useState("");
  const [ descripcionAdan, setDescripcionAdan ] = useState("");
  const [ descripcionSebas, setDescripcionSebas ] = useState("");
  const [ nombreContacto, setNombreContacto ] = useState("");
  const [ tlfContacto, setTlfContacto ] = useState("");
  const [ emailContacto, setEmailContacto ] = useState("");
  const [ mensajeContacto, setMensajeContacto ] = useState("");
  const [ reproducirVideo, setReproducirVideo] = useState(false);
  const [ link, setLink] = useState("");
  const [ nombreVideo, setNombreVideo ] = useState("");
  const [ categoria, setCategoria ] = useState("");
  const [ subcategoria, setSubcategoria ] = useState("");
  const [ plataforma, setPlataforma ] = useState("");

  const [ data, setData ] = useState([]);
  const listaVideos = [];

  const cargarVideos = () => {

    fb.database().ref('videos').on("value", snapshot => {
      snapshot.forEach((snap) => {
        const video = {
          id: snap.key,
          nombre: snap.val().nombre,
          categoria: snap.val().categoria,
          subcategoria: snap.val().subcategoria,
          plataforma: snap.val().plataforma,
          image: snap.val().image,
          enlace: snap.val().enlace
        };

        listaVideos.push(video)
      });
      setData(listaVideos);
    });
    return data;
  };

  useEffect(() => {

    const ref1 = fb.database().ref('usuarios/' + adanID);
    ref1.on('value', (snapshot) => {
      setNombreAdan(snapshot.val().nombre)
      setDescripcionAdan(snapshot.val().descripcion)
    });

    const ref2 = fb.database().ref('usuarios/' + sebasID);
    ref2.on('value', (snapshot) => {
      setNombreSebas(snapshot.val().nombre)
      setDescripcionSebas(snapshot.val().descripcion)
    });

    cargarVideos();

  }, [])



  const handleVideo = (enlace, nombre, categoria, subcategoria, plataforma) => {
    setLink(enlace);
    setNombreVideo(nombre);
    setCategoria(categoria);
    setSubcategoria(subcategoria);
    setPlataforma(plataforma);
    setReproducirVideo(! reproducirVideo);
  }

  return (
    <>
      <Parallax>
        <Titulo>
          BIENVENIDO A NUESTRO PORTAFOLIO WEB
          <br/>
          <h1>Topicos Avanzados de la Programacion Web.</h1>
        </Titulo>
      </Parallax>

      <EspacioBlanco>
        <h1>SEBADÁN</h1>
        <br/>
        <h3>SEBADÁN es un grupo de desarrollo de software que ofrece la implementación de las más recientes tecnologías para crear sitios web personales, de empresas y/o instituciones. SEBADÁN cuenta con un amplio abánico de conocimientos orientados a satisfacer las necesidades del cliente, permitiendo un concurrente flujo de comunicación entre el cliente y el grupo de desarrollo, brindándole así un producto de calidad, responsivo y de duración ya que el producto puede evolucionar con el paso del tiempo.</h3>
      </EspacioBlanco>

      <ContenedorDatos>
        <h2>Programadores</h2>

        <div className="row">

          <div className="col-md-2">
          </div>

          <EspacioDatos className="col-md-4">
            <h4>{ nombreAdan }</h4>
            <h6>{ descripcionAdan }</h6>
          </EspacioDatos>

          <Logo src="/images/logo.png"/>

          <div className="col-md-4">
            <h4>{ nombreSebas }</h4>
            <h6>{ descripcionSebas }</h6>
          </div>
        </div>

      </ContenedorDatos>

      <Parallax2>
        <Titulo>
          ABARCANDO VARIOS
          <br/>
          CAMPOS DE LA PROGRAMACION
        </Titulo>
      </Parallax2>

      <div className="row">

        <ContenedorObjetivo className="col-md-4">
          <br/>
          <H2><GiIcons.GiStairsGoal /></H2>
          <H3>Objetivos</H3>
          <br/>
          <h6>En SEBADAN, trabajamos para darle vida a sus ideas. Nuestro equipo de trabajo aportará todo su experiencia para que su proyecto sea un caso de exito</h6>
        </ContenedorObjetivo>

        <ContenedorContacto className="col-md-4">
          <br/>
          <H2><MdIcons.MdContactMail /></H2>
          <H3>Contacto</H3>
          <h6>Contactenos, nosotros lo atenderemos.</h6>
          <BotonContacto className="btn btn-info" onClick={(e) => handleContacto()} >Contactanos</BotonContacto>
        </ContenedorContacto>

        <ContenedorServicio className="col-md-4">
          <br/>
          <H2><MdIcons.MdWidgets /></H2>
          <H3>Servicio</H3>
          <br/>
          <h6>SEBADAN brinda servicio orientado a el desarrollo de software y desarrollo de páginas web.</h6>
        </ContenedorServicio>
      </div>

      <H1>Portafolio de trabajos</H1>
      <Subtitulo>Puede echarle un vistazo a algunos de nuestros proyectos</Subtitulo>

      <Portafolio>
        <div className="row">
          {data.map((video) => (
            <ContenedorImagen className="col-sm-3">
              <Img src={video.image} />
              <BotonPortafolio className="btn btn-dark" onClick={(e) => handleVideo(video.enlace, video.nombre, video.categoria, video.subcategoria, video.plataforma)} >Ver proyecto</BotonPortafolio>
            </ContenedorImagen>
          ))}
        </div>
      </Portafolio>

      <ModalMensaje fb={fb} show={mostrarModal} onHide={() => setMostrarModal(false)} nombreContacto={nombreContacto} setNombreContacto={setNombreContacto} tlfContacto={tlfContacto} setTlfContacto={setTlfContacto} emailContacto={emailContacto} setEmailContacto={setEmailContacto} mensajeContacto={mensajeContacto} setMensajeContacto={setMensajeContacto} />
      <ModalReproductorVideo show={reproducirVideo} onHide={() => setReproducirVideo(false)} enlace={link} nombre={nombreVideo} categoria={categoria} subcategoria={subcategoria} plataforma={plataforma} />

    </>
  )
};

export default AdminPage;
