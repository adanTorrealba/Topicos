
// Importando react
import React, { useState } from 'react';

// Importando librerias
import styled from 'styled-components';
import {Modal, Button, Row, Col, Form, ProgressBar} from 'react-bootstrap';

const Error = styled.span`
  margin-right: 15px;
  color: red;
`;

const Succes = styled.span`
  margin-right: 15px;
  color: green;
`;

 const ModalFormVideo2 = (props) => {

   const {fb, show, onHide } = props
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
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Ingresar Video Nuevo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Rellene el siguiente formulario y para poder ingresar un video</h4>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Video</Form.Label>
            <Form.Control type="text" value={nombreVideo} placeholder="Ingrese el nombre del video" onChange={(e) => setNombreVideo(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoria</Form.Label>
            <Form.Control as="select"  value={categoria} onChange={(e) => setCategoria(e.target.value)} >
              <option selected>Seleccione una categoria...</option>
              <option value="Aplicacion Web">Aplicacion Web</option>
              <option value="Aplicacion de Escritorio">Aplicacion de Escritorio</option>
              <option value="Aplicacion Movil">Aplicacion Movil</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Subcategoria</Form.Label>
            <Form.Control as="select"  value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)} >
              <option selected>Seleccione una subcategoria...</option>
              <option value="Juego">Juego</option>
              <option value="Blog">Blog</option>
              <option value="Tienda">Tienda</option>
              <option value="Portafolio">Portafolio</option>
              <option value="Simulador">Simulador</option>
              <option value="Tutorial">Tutorial</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Plataforma de Desarrollo</Form.Label>
            <Form.Control as="select" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} >
              <option selected>Seleccione una plataforma...</option>
              <option value="Python">Python</option>
              <option value="React Js">React Js</option>
              <option value="Java">Java</option>
              <option value="HTML">HTML</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.File type="file" label="Imagen para el Video" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enlace del Video</Form.Label>
            <Form.Control type="text" value={enlace} placeholder="Ingrese el enlace del video" onChange={(e) => setEnlace(e.target.value)} />
          </Form.Group>
        </Form>
        <ProgressBar striped variant="info" now={progress} label={`${String(progress)}%`} />
      </Modal.Body>
      <Modal.Footer>
        <Error>{errorMsg}</Error>
        <Succes>{updateMsg}</Succes>
        <Button variant="info" type="submit" onClick={handleVideo}>Agregar Video</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFormVideo2;
