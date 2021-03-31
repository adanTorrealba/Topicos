
// Importando react
import React, { useRef, useState } from 'react';

// Importando librerias
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import ReactPlayer from 'react-player';

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


 const ModalReproductorVideo = (props) => {

  const { reproducirVideo, setReproducirVideo, videoReproducido } = props;

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: reproducirVideo ? 1 : 0,
    transform: reproducirVideo ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setReproducirVideo(false);
    }
  };

  console.log(videoReproducido)

  return (
    <>
      {reproducirVideo ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper mostrarModal={reproducirVideo}>

              <ReactPlayer
                url = {videoReproducido}
                width = '100%'
                height = '100%'
                controls
                playing
              />

              <CloseModalButton
                aria-label='Cerrar modal'
                onClick={() => setReproducirVideo(prev => !prev)}
              />

            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default ModalReproductorVideo;
