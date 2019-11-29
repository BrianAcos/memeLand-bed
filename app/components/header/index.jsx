const React = require('react');
const { Link } = require('react-router-dom');

class Header extends React.Component {
  render() {
    const reqSessionName = 'Brian';
    return (
      <nav className="navbar navbar-expand">
        <Link to={'/'} className="navbar-brand" ><img src="assets/ico.png" alt="ico" className="ico" /></Link>
        <ul className="navbar-nav mr-auto ml-auto">
          <li className="nav-item">
            <Link to={'/'} className="nav-link">Inicio</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href='#subir' data-toggle="modal" data-target="#subirMeme">Subir MEME</a>
          </li>
          <li className="nav-item">
            <Link to={`favoritos/${reqSessionName}`} className="nav-link">Favoritos</Link>
          </li>
        </ul>
        <ul>
          {this.props.session === reqSessionName ?
            <li>
              <a href="#registro" data-toggle="modal" data-target="#registro">REGISTRARSE</a><br></br>
              <a href="#login" data-toggle="modal" data-target="#sesion">INICIAR SESION</a><br></br>
              <a href="#contacto" data-toggle="modal" data-target="#contacto">CONTACTO(FOOTER)</a>
            </li>
            :
            <li>
              <Link to={`perfil/${reqSessionName}`} >PERFIL</Link>
            </li>}
        </ul>
      </nav>
    );
  }
}

module.exports = Header;