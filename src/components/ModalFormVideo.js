
// Importando react
import React, { useRef, useState } from 'react';

// Importando librerias
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

// Configurando los estilos de el fondo
const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 1200px;
  height: 500px;
  bottom: 100px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const Titulo = styled.div`
  position: relative;
  display: flex;
  text-aling: center;
  justify-content: center;
  margin-top: 20px;
`;

const Boton = styled.button`
  margin-top: 60px;
`;

// Configurando los estilos de los mensajes de error
const Error = styled.span`
  color: red;
`;

// Configurando los estilos de los mensajes de actualizacion aprobada
const Update = styled.span`
  color: green;
`;

 const ModalFormVideo = (props) => {

  const { fb, mostrarModal, setMostrarModal } = props;

  const modalRef = useRef();
  const [ nombreVideo, setNombreVideo ] = useState('');
  const [ categoria, setCategoria ] = useState('');
  const [ subcategoria, setSubcategoria ] = useState('');
  const [ plataforma, setPlataforma ] = useState('');
  const [ imagenVideo, setImagenVideo ] = useState([]);
  const [ enlace, setEnlace ] = useState('');
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ updateMsg, setUpdateMsg ] = useState('');
  const [ imagen, setImagen ] = useState('');
  const [ progress, setProgress] = useState('');

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: mostrarModal ? 1 : 0,
    transform: mostrarModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setMostrarModal(false);
    }
  };

  const handleVideo = () => {
    if (!nombreVideo || !categoria || !subcategoria || !plataforma || !imagen || !enlace) {
      setUpdateMsg("");
      setErrorMsg("No se pueden dejar casillas en blanco.")
    } else {
      setErrorMsg("");

      const subirImagen = fb.storage().ref("imagenesMiniaturas/" + nombreVideo).put(imagen);
      subirImagen.on(
        "state_changed",
        snapshot => {
          const progreso = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progreso);
        },
        error => {
          console.log(error)
        },
        () => {
          fb.storage()
                    .ref("imagenesMiniaturas")
                    .child(nombreVideo)
                    .getDownloadURL()
                    .then(url => {
                      guardarDatos(url)
                    })
        }
      );
    };
  };

  const guardarDatos = (img) => {
    if (img) {
      const video = {
        nombre: nombreVideo,
        categoria: categoria,
        subcategoria: subcategoria,
        plataforma: plataforma,
        image: img,
        enlace: enlace
      };

      fb.database().ref("videos").push(video);
      setUpdateMsg("Video cargado exitosamente.")
    };
  }

  return (
    <>
      {mostrarModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper mostrarModal={mostrarModal}>

              <Titulo><h1>Ingresar Video</h1></Titulo>
              <ModalContent>

                <div className="row">

                  <div className="col-md-1">
                  </div>

                  <div className="col-md-3">

                    <div className="form-group">
                      <label>Nombre del Video</label>
                      <input className="form-control" placeholder="Ingrese el nombre del video" autoFocus required onChange={(e) => setNombreVideo(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label>Categoria</label>
                      <div className="input-group mb-3">
                        <select className="custom-select" required value={categoria} onChange={(e) => setCategoria(e.target.value)} >
                          <option selected>Seleccione una categoria...</option>
                          <option value="Aplicacion Web">Aplicacion Web</option>
                          <option value="Aplicacion de Escritorio">Aplicacion de Escritorio</option>
                          <option value="Aplicacion Movil">Aplicacion Movil</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Subcategoria</label>
                      <div className="input-group mb-3">
                        <select className="custom-select" required value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)} >
                          <option selected>Seleccione una subcategoria...</option>
                          <option value="Juego">Juego</option>
                          <option value="Blog">Blog</option>
                          <option value="Tienda">Tienda</option>
                          <option value="Portafolio">Portafolio</option>
                          <option value="Simulador">Simulador</option>
                          <option value="Tutorial">Tutorial</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                  </div>

                  <div className="col-md-3">

                    <div className="form-group">
                      <label>Plataforma de Desarrollo</label>
                      <div className="input-group mb-3">
                        <select className="custom-select" required value={plataforma} onChange={(e) => setPlataforma(e.target.value)} >
                          <option selected>Seleccione una plataforma...</option>
                          <option value="Python">Python</option>
                          <option value="React Js">React Js</option>
                          <option value="Java">Java</option>
                          <option value="HTML">HTML</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Imagen para el Video</label>
                      <input type="file" className="form-control-file" required accept="image/*" onChange={(e) => setImagen(e.target.files[0])}/>
                    </div>

                    <div className="form-group">
                      <label>Enlace del Video</label>
                      <input className="form-control" placeholder="Ingrese el enlance del video" autoFocus required onChange={(e) => setEnlace(e.target.value)} />
                    </div>

                  </div>

                </div>

                <Boton className="btn btn-info" onClick={handleVideo}>Agregar Video</Boton>

              </ModalContent>
              <Error>{errorMsg}</Error>
              <Update>{updateMsg}</Update>

              <CloseModalButton
                aria-label='Cerrar modal'
                onClick={() => setMostrarModal(prev => !prev)}
              />
              <div className="progress">
                <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: String(progress) + "%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{String(progress) + "%"}</div>
              </div>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default ModalFormVideo;
