const React = require('react');
const { Link } = require('react-router-dom');
const Tarjeta = require('../tarjeta');
const Header = require('../header');
const Filtros = require('../filtros');
const Login = require('../login');
const Registro = require('../registro');
const Contacto = require('../contacto');
const SubirMeme = require('../subirMeme');

class PaginaInicial extends React.Component {
  render() {
    const { memes, username } = this.props;

    return (
      <React.Fragment>
        <Header username={username}/>
        <div className="container-fluid">
          <div className="row">
            <Filtros />
            <div className="col contenido">
              <div className="row">
                {
                  memes.map(meme => (
                    <Tarjeta key={meme.idmeme} idmeme={meme.idmeme} creador={meme.creador} titulo={meme.titulo} tags={meme.tags} foto={meme.foto} categoria={meme.categoria} fecha={meme.fecha} votos={meme.votos} puntaje={meme.puntaje} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <Login />
        <Registro />
        <Contacto />
        <SubirMeme /> 
      </React.Fragment >
    );
  }
};

module.exports = PaginaInicial;