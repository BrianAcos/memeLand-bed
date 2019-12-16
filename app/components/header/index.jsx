const React = require('react');

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modificar: true,
    }
  }

  render() {
    const { username } = this.props;
    return (
      <nav className="navbar navbar-expand">
        <a href="http://localhost:3001" className="navbar-brand" ><img src="../assets/ico.png" alt="ico" className="ico" /></a>
        <ul className="navbar-nav mr-auto ml-auto">
          <li className="nav-item">
            <a href="http://localhost:3001" className="nav-link">Inicio</a>
          </li>
          {username ?
            <li className="nav-item">
              <a className="nav-link" href='#subir' data-toggle="modal" data-target="#subirMeme">Subir MEME</a>
            </li>
            : null
          }
        </ul>
        <ul>
          {username ?
            <li>
              <a href={`http://localhost:3001/perfil/${username}`}>PERFIL</a><br />
              <a href={`http://localhost:3001/noaprobados`}>MODERAR</a><br />
              <a href={`http://localhost:3001/favoritos/${username}`}>FAVORITOS</a><br />
              <a href="http://localhost:3001/api/cerrarSesion">CERRAR SESION</a>
            </li>
            :
            <li>
              <a href="#registro" data-toggle="modal" data-target="#registro">REGISTRARSE</a><br />
              <a href="#login" data-toggle="modal" data-target="#sesion">INICIAR SESION</a><br />
            </li>}
        </ul>
      </nav>
    );
  }
}

Header.defaultProps = {
  username: null,
};

module.exports = Header;