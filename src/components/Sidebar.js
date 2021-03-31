
// Importando react
import React, { useState, useEffect } from 'react';

// Importando Firabase
import fb from '../firebase-config'

// Importando librerias
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';

// Importando componentes
import Footer from './Footer'

// Importando componentes secudnarios (paginas)
import AdminPage from './pages/AdminPage';
import PerfilPage from './pages/PerfilPage';
import ComponentesPage from './pages/ComponentesPage';
import GaleriaPage from './pages/GaleriaPage';
import GaleriaImgPage from './pages/GaleriaImgPage';
import GaleriaVdPage from './pages/GaleriaVdPage';
import MensajesPage from './pages/MensajesPage';

//Importando los iconos de react
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';

// Configurando los estilos de la barra de navegacion
const Nav = styled.nav`

  /* Gradiente del fondo */
  background: #0F2027;
  background: -webkit-linear-gradient(to left, #2C5364, #203A43, #0F2027);
  background: linear-gradient(to left, #2C5364, #203A43, #0F2027);

  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// Configurando los estilos del boton para el sidebar
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// Configurar los estilos de la sidebar
const SidebarNav = styled.nav`
  background: #081115;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

// Configurando el tamaño del contenedor del sidebar
const SidebarWrap = styled.div`
  width: 100%;
`;

// Configurando los estilos de el texto que esta en el navbar
const NavbarText = styled.div`
  color: white;
  display: flex;
  text-aling: center;
  justify-content: center;
  align-items: center;
  margin-left: 670px;

  &:hover {
    h4 {
      -webkit-transform:translateX(-77px);
      -webkit-transition:all .2s linear;
    }

    img {
      filter: opacity(.4);
      -webkit-transition:all .3s linear;
      -webkit-transform:scale(1.3);
      transform:scale(2);
    }
  }

  cursor: pointer
`;

// Configurando los estilos del texto de las opciones del navbar
const NavbarTextItem = styled(Link)`
  color: white;
  margin-left: 30px;
  font-size: 1.1rem;

  &:hover {
    color: white;
    font-size: 1.3rem;
  }
`;

// Configurando el estilo de los links del menu sidbar
const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  /* Al pasar el cursor por encima */
  &:hover {
    color: #2C5364;
    background: #252831;
    border-left: 4px solid #2C5364;
    cursor: pointer;
  }
`;

// Configurando el estilo de los contenedores en donde estaran los titulos
const SidebarLabel = styled.span`
  margin-left: 16px;
`;

// Configurando el estilo de los dropdowns
const DropdownLink = styled(Link)`

  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 18px;

  /* Al pasar el cursor por encima */
  &:hover {
    color: #0F2027;
    background: #2C5364;
    cursor: pointer;
  }
`;

const Logo = styled.img`
  margin-top: 2px;
  width: 50px;
  -webkit-transition:all .3s linear;
`;

const Titulo = styled.h4`
  -webkit-transition:all .2s linear;
`;

// Creando el componente funcional principal para el sidebar
const Sidebar = (props) => {

  const { handleLogout } = props;

  // Declarando una variable de estado y una funcion para mostrar y esconder el sidebar
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  // Declarando la variable de estado y una funcion para mostrar y esconder el dropdown del sidebar
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  // Declarando las variables de estado para los datos del usuario
  const [ nombre, setNombre ] = useState('');
  const [ nmrTelefono, setNmrTelefono ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ descripcion, setDescripcion ] = useState('');
  const [ imgPerfil, setImgPerfil ] = useState('');
  const [ facebook, setFacebook ] = useState('');
  const [ twitter, setTwitter ] = useState('');
  const [ instagram, setInstagram ] = useState('');

  const listaMensajes = [];
  const [ data, setData ] = useState([]);

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
          facebook: snap.val().facebook,
          twitter: snap.val().twitter,
          instagram: snap.val().instagram,
        };

        listaMensajes.push(mensaje)
      });
      setData(listaMensajes);
    });
  };

  // Extrayendo los datos del usuario desde la base de datos
  useEffect(() => {
    cargarMensajes();
    const ref = fb.database().ref('usuarios/' + fb.auth().currentUser.uid);
    ref.on('value', (snapshot) => {
      setNombre(snapshot.val().nombre)
      setNmrTelefono(snapshot.val().nmrTelefono)
      setEmail(snapshot.val().email)
      setPassword(snapshot.val().password)
      setDescripcion(snapshot.val().descripcion)
      setImgPerfil(snapshot.val().imgPerfil)
      setFacebook(snapshot.val().facebook)
      setTwitter(snapshot.val().twitter)
      setInstagram(snapshot.val().instagram)
    });
  }, [])

  // Renderizacion
  return (
    <Router>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav className="sticky-top">
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <NavbarText>
            <Logo src="/images/logo.png"></Logo>
            <Titulo>SEBADÁN</Titulo>

            <NavbarTextItem to="/" >Home</NavbarTextItem>
            <NavbarTextItem to="/galeria/videos" >Portafolio</NavbarTextItem>
            <NavbarTextItem to="#">Contacto</NavbarTextItem>

          </NavbarText>
        </Nav>

        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>

            <SidebarLink to="#">
              <div>
                <FaIcons.FaUser />
                <SidebarLabel>{ nombre }</SidebarLabel>
              </div>
            </SidebarLink>

            <SidebarLink to="/">
              <div>
                <AiIcons.AiFillHome />
                <SidebarLabel>Home</SidebarLabel>
              </div>
            </SidebarLink>

            <SidebarLink to="/perfil">
              <div>
                <RiIcons.RiUserSettingsFill />
                <SidebarLabel>Perfil</SidebarLabel>
              </div>
            </SidebarLink>

            <SidebarLink to="/componentes-web">
              <div>
                <FaIcons.FaCode />
                <SidebarLabel>Componentes Web</SidebarLabel>
              </div>
            </SidebarLink>

            <>
            <SidebarLink to="/galeria" onClick={ showSubnav }>
              <div>
                <FaIcons.FaArchive />
                <SidebarLabel>Galerias</SidebarLabel>
              </div>

              <div>
                {!subnav && <RiIcons.RiArrowDownSFill />}
                {subnav && <RiIcons.RiArrowUpSFill />}
              </div>
            </SidebarLink>

              {subnav &&
                <>
                  <DropdownLink to="/galeria/videos">
                    <FaIcons.FaVideo />
                    <SidebarLabel>Videos</SidebarLabel>
                  </DropdownLink>
                  <DropdownLink to="/galeria/imagenes">
                    <FaIcons.FaCamera />
                    <SidebarLabel>Imagenes</SidebarLabel>
                  </DropdownLink>
                </>
            }
            </>

            <SidebarLink to="/mensajes">
              <div>
                <FaIcons.FaEnvelope />
                <SidebarLabel>
                  Mensajes
                  <span className="badge badge-pill badge-info">{data.length}</span>
                </SidebarLabel>
              </div>
            </SidebarLink>

            <SidebarLink to="/" onClick={ handleLogout }>
              <div>
                <FaIcons.FaUserAltSlash />
                <SidebarLabel>Cerrar Sesión</SidebarLabel>
              </div>
            </SidebarLink>

          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>

      <Switch>
      <Route path="/" exact>
         <AdminPage fb={fb} />
       </Route>
      <Route path="/perfil" exact>
        <PerfilPage fb={fb} nombre={nombre} setNombre={setNombre} nmrTelefono={nmrTelefono} setNmrTelefono={setNmrTelefono} email={email} setEmail={setEmail} password={password} setPassword={setPassword} descripcion={descripcion} setDescripcion={setDescripcion} imgPerfil={imgPerfil} setImgPerfil={setImgPerfil} facebook={facebook} setFacebook={setFacebook} twitter={twitter} setTwitter={setTwitter} instagram={instagram} setInstagram={setInstagram} />
      </Route>
      <Route path="/componentes-web" exact component={ ComponentesPage } />
      <Route path="/galeria" exact component={ GaleriaPage } />
      <Route path="/galeria/videos" exact>
        <GaleriaVdPage fb={fb} />
      </Route>
      <Route path="/galeria/imagenes" exact component={ GaleriaImgPage } />
      <Route path="/mensajes" exact>
        <MensajesPage fb={fb} />
       </Route>
      </Switch>

      <Footer/>
    </Router>
  );
};

// Exportando el componente
export default Sidebar;
