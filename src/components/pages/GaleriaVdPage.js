
// Importando react
import React, { useState, useEffect } from 'react';

// Importando librerias
import styled from 'styled-components';

// Importando Componentes
import ModalFormVideo2 from '../ModalFormVideo2'
import ModalReproductorVideo from '../ModalReproductorVideo'

const Titulo = styled.div`
  margin-top: 5px;
`;

// Copnfigurando los estilos del contenedor
const Contenedor = styled.div`
  margin: 100px auto;
  margin-top: 20px;
  height: 200vh;
  display: grid;
`;

const Card = styled.div`
  width: 11rem;
  max-width: 11rem;
  display: grid;
`;

const GaleriaVdPage = ({fb}) => {

  const [ data, setData ] = useState([]);
  const listaVideos = [];
  const [ mostrarModal, setMostrarModal ] = useState(false);
  const [ reproducirVideo, setReproducirVideo ] = useState(false);
  const [ videoReproducido, setVideoReproducido ] = useState('');
  const [ termino, setTermino ] = useState('');
  const [ nombre, setNombre ] = useState("");
  const [ categoria, setCategoria ] = useState("");
  const [ subcategoria, setSubcategoria ] = useState("");
  const [ plataforma, setPlataforma ] = useState("");

  const handleModal = () => {
    setMostrarModal(!mostrarModal);
  };

  const handleReproducirVideo = (enlace, nombre, categoria, subcategoria, plataforma) => {
    setVideoReproducido(enlace);
    setNombre(nombre);
    setCategoria(categoria);
    setSubcategoria(subcategoria);
    setPlataforma(plataforma);
    setReproducirVideo(!reproducirVideo);
  };

  const filtrarVideo = (term) => {
    return function(video) {
      return video.nombre.toLowerCase().includes(term) || !term;
    };
  };

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
    cargarVideos()
  }, []);

  const eliminarVideo = (id) => {
    fb.database().ref("videos/" + id).remove();
    cargarVideos();
  };

  return (

    <Contenedor>

            <Titulo><h1>Galeria de Videos</h1></Titulo>

            <div className="container">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Buscar video por titulo..." onChange={(e) => setTermino(e.target.value)} />
                <div className="input-group-append">
                  <button className="btn btn-info">Buscar</button>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row mt-2">

              <div className="col-sm-3">
                <Card className="card mt-4 text-white bg-secondary">
                  <img src="https://www.pngkit.com/png/detail/115-1152626_png-lovely-design-ideas-plus-sign-clip-art.png" className="card-img-top" />
                  <div className="card-header"><h5 className="card-title">Agregar Video</h5></div>
                  <div className="card-body">Agrega un nuevo video</div>
                  <div className="card-footer">
                    <a href="#" className="btn btn-info" onClick={handleModal}>Agregar</a>
                  </div>
                </Card>
              </div>

              {data.filter(filtrarVideo(termino)).map((video) => (
                <div className="col-sm-3">
                  <Card key={video.id} className="card mt-4 text-white bg-secondary">
                    <img src={video.image} className="card-img-top" />
                    <div className="card-header"><h5 className="card-title">{video.nombre}</h5></div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-secondary">{video.categoria + " / " + video.subcategoria}</li>
                      <li className="list-group-item bg-secondary">{video.plataforma}</li>
                    </ul>
                    <div className="card-footer">
                      <button className="btn btn-info" onClick={(e) => handleReproducirVideo(video.enlace, video.nombre, video.categoria, video.subcategoria, video.plataforma)}>Ver</button>
                      <button className="btn btn-danger" onClick={(e) => eliminarVideo(video.id)}>Eliminar</button>
                    </div>
                  </Card>
                </div>
              ))}
              </div>
            </div>

        <ModalReproductorVideo show={reproducirVideo} onHide={() => setReproducirVideo(false)} enlace={videoReproducido} nombre={nombre} categoria={categoria} subcategoria={subcategoria} plataforma={plataforma} />
        <ModalFormVideo2 fb={fb} show={mostrarModal} onHide={() => setMostrarModal(false)} />

    </Contenedor>

  )
};

export default GaleriaVdPage;
