const React = require('react');
const { Link } = require('react-router-dom');

class Header extends React.Component {
  render() {
    const {username} = this.props;
    return (
      <nav className="navbar navbar-expand">
        <a href="http://localhost:3001" className="navbar-brand" ><img src="../assets/ico.png" alt="ico" className="ico" /></a>
        <ul className="navbar-nav mr-auto ml-auto">
          <li className="nav-item">
            <a href="http://localhost:3001" className="nav-link">Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href='#subir' data-toggle="modal" data-target="#subirMeme">Subir MEME</a>
          </li>
          <li className="nav-item">
            
          </li>
        </ul>
        <ul>
          {username ?
          <li>
            <a href={`http://localhost:3001/perfil/${username}`}>PERFIL</a><br/>
            <a href={`http://localhost:3001/noaprobados`}>MODERAR</a><br/>
            <a href={`http://localhost:3001/favoritos/${username}`}>FAVORITOS</a>
          </li>
            // <li><Link to={`perfil/${username}`} >PERFIL</Link></li>
            :
            <li>
              <a href="#registro" data-toggle="modal" data-target="#registro">REGISTRARSE</a><br/>
              <a href="#login" data-toggle="modal" data-target="#sesion">INICIAR SESION</a><br/>
            </li>}
          {/* <li>
            <Link to={`perfil/${reqSessionName}`} >PERFIL</Link><br/>
            <a href="#registro" data-toggle="modal" data-target="#registro">REGISTRARSE</a><br/>
            <a href="#login" data-toggle="modal" data-target="#sesion">INICIAR SESION</a><br/>
            <a href="#contacto" data-toggle="modal" data-target="#contacto">CONTACTO(FOOTER)</a>
          </li> */}
        </ul>
      </nav>
    );
  }
}

Header.defaultProps = {
  username: null,
};

module.exports = Header;