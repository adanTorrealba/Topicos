
// Importando react
import React, { useState, useEffect } from 'react';

// Importando librerias
import styled from 'styled-components';
import paginationFactory from "react-bootstrap-table2-paginator";

// Importando iconos
import * as BsIcons  from "react-icons/bs";

const Contenedor = styled.div`
  display: flex;
  height: 96vh;
  margin-left: 8%;
  margin-right: 8%;
  margin-top: -10%;
  align-items: center;
  justify-content: center;
`;

const Titulo = styled.div`
  margin-top: 3%;
  margin-bottom: 40px;
`;

const Paginacion = styled.div`
  margin-top: -14%;
  margin-bottom: 9%;
`;

const MensajePage = ({fb}) => {

  const listaMensajes = [];
  const [ data, setData ] = useState([]);
  const [ dataSplit, setDataSplit ] = useState([]);
  const [ paginaActual, setPaginaActual ] = useState(1);
  const ITEMS_POR_PAGINA = 5;
  const index = [];
  const [ activador, setActivador ] = useState(0);
  const [ termino, setTermino ] = useState('');

  const cargarMensajes = () => {

    fb.database().ref('mensajes').on("value", snapshot => {
      snapshot.forEach((snap) => {

        const mensaje = {
          id: snap.key,
          contacto: snap.val().contacto,
          correo: snap.val().correo,
          mensaje: snap.val().mensaje,
          status: snap.val().status,
          telefono: snap.val().telefono,
        };

        listaMensajes.push(mensaje)
      });
      setData(listaMensajes);
      setDataSplit(data.reverse());
      dividirMensajes();
    });
  };

  useEffect(() => {
    cargarMensajes();
  }, [activador]);

  const dividirMensajes = () => {
    const temp = data.slice(
      (paginaActual - 1) * ITEMS_POR_PAGINA,
      (paginaActual - 1) * ITEMS_POR_PAGINA + ITEMS_POR_PAGINA
    );
    setDataSplit(temp.reverse());
    setActivador(activador + 1)
  };

  const paginaPrevia = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
      dividirMensajes();
    };
  };
  const paginaSiguiente = () => {
    if (paginaActual < (data.length / 5)) {
      setPaginaActual(paginaActual + 1);
      dividirMensajes();
    };
  };

  const paginaPorIndice = (e) => {
    setPaginaActual(e.target.id);
    dividirMensajes();
  };

  const verMensaje = (msg) => {
    fb.database().ref("mensajes/" + msg.id).set({
      id: msg.id,
      contacto: msg.contacto,
      correo: msg.correo,
      mensaje: msg.mensaje,
      status: "Leido",
      telefono: msg.telefono,
    });
  };

  const eliminarMensaje = (id) => {
    fb.database().ref("mensajes/" + id).remove();
    cargarMensajes();
  };

  const filtrarMensaje = (term) => {
    return function(msg) {
      return msg.contacto.toLowerCase().includes(term) || !term;
    }
  };

  return (
    <>

      <Titulo><h1>Mensajes</h1></Titulo>

      <div className="container">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Buscar mensaje por nombre de contacto..." onChange={(e) => setTermino(e.target.value)} />
          <div className="input-group-append">
            <button className="btn btn-info">Buscar</button>
          </div>
        </div>
      </div>

      <Contenedor>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Contacto</th>
              <th>Correo</th>
              <th>Mensaje</th>
              <th>Telefono</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataSplit.filter(filtrarMensaje(termino)).map((msg, i) => (
              <tr key="msg.id">
                <th scope="row">{-1 * (i - 4)}</th>
                <td>{msg.contacto}</td>
                <td>{msg.correo}</td>
                <td>{msg.mensaje}</td>
                <td>{msg.telefono}</td>
                <td>{msg.status}</td>
                <td>
                  <button className="btn btn-primary" onClick={(e) => verMensaje(msg)} ><BsIcons.BsFillEyeFill /></button>
                  <button className="btn btn-danger" onClick={(e) => eliminarMensaje(msg.id)} ><BsIcons.BsFillTrashFill /></button>
                </td>
              </tr>
            )).reverse()}
          </tbody>
        </table>

      </Contenedor>

      <ul>
        {(() => {
        for (var i = 1; i <= data.length; i++) {
          let numero = i/5;
          if (numero % 1 == 0) {
            index.push(numero)
          }
        }
      })()}
      </ul>

      <Paginacion>
        <nav className="align-center">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button className="page-link" onClick={paginaPrevia}  href="#">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
              <li className="page-item"><a className="page-link" id="1" onClick={paginaPorIndice} href="#">1</a></li>
              <li className="page-item"><a className="page-link" id="2" onClick={paginaPorIndice} href="#">2</a></li>
            <li className="page-item">
              <a className="page-link" onClick={paginaSiguiente} href="#">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </Paginacion>
      </>
  )
};

export default MensajePage;
