//import React from 'react';
const React = require('react');

class Tarjeta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      puntuacion: false,
      redirect: false,
      error: null,
      fav: false,
      comentario: null,
      comentariosDelMeme: [],
      puntajeDelMeme: {},
      borrarComponente: false,
    }

    this.aprobar = this.aprobar.bind(this);
    this.enviarComentario = this.enviarComentario.bind(this);
    this.cambiarComentario = this.cambiarComentario.bind(this);
    this.changeFav = this.changeFav.bind(this);
    this.cambiarPuntuacion = this.cambiarPuntuacion.bind(this);
  }

  aprobar(event) {
    fetch('/api/memes/aprobacion/null', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        idmeme: this.props.idmeme,
        aprobacion: event
      }),
    })
      .then(() => {
        this.setState({ borrarComponente: true })
      })
      .catch(() => {
        this.setState({ error: 'error-aprobacion' });
      })
  }

  componentDidMount() {
    fetch(`/api/comentarios/memes/${this.props.idmeme}`)       //VA A LA API A BUSCAR LOS DATOS SOBRE ESA TAREA Y LOS CARGA EN EL ESTADO
      .then(res => res.json())
      .then(data => {
        this.setState({
          comentariosDelMeme: data === 'No ha sido comentado aun' ? [] : data,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          comentariosDelMeme: [],
          error: 'error-carga-de-comentarios',
        });
      });
    fetch(`/api/puntajes/memes/${this.props.idmeme}`)       //VA A LA API A BUSCAR LOS DATOS SOBRE ESA TAREA Y LOS CARGA EN EL ESTADO
      .then(res => res.json())
      .then(data => {
        this.setState({
          puntajeDelMeme: data,
          error: false,
        });
      })
      .catch((err) => {
        this.setState({
          comentariosDelMeme: {},
          error: 'error-carga-de-puntaje',
        });
      });
  }

  enviarComentario() {
    fetch('/api/comentarios', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        idmeme: this.props.idmeme,
        username: 'brian', // EL USUARIO QUE HIZO CLICK ESTA EN LA SESSION
        comentario: this.state.comentario,
      }),
    })
      .then(() => {
        this.setState({ comentario: true })
      })
      .catch(() => {
        this.setState({ error: 'error-comentario' });
      })
  }

  cambiarComentario(event) {
    this.setState({ comentario: event.target.value });
  }

  cambiarPuntuacion(event) {
    fetch('/api/puntajes', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        idmeme: this.props.idmeme,
        username: 'brian', // EL USUARIO QUE HIZO CLICK ESTA EN LA SESSION
        puntaje: event.target.value,
        creador: this.props.creador,
      }),
    })
      .then(() => {
        this.setState({ puntuacion: true })
      })
      .catch(() => {
        this.setState({ error: 'error-puntuacion' });
      })
  }

  //cuando hace click en el boton favoritos agrega a favoritos y cambia el estado
  changeFav() {
    fetch('/api/favoritos', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        username: 'brian', //EL USUARIO QUE HIZO CLICK ESTA EN LA SESSION
        idmeme: this.props.idmeme,
      })
    })
      .then(() => {
        this.setState({ fav: true })
      })
      .catch(() => {
        this.setState({ error: 'error-favoritos' });
      })

  }

  render() {
    const radioName = `estrellas-${this.props.idmeme}`;
    if (this.state.borrarComponente === true) { return (null) }
    return (
      <div className="col col-12 col-md-6">
        <div className="tarjeta">
          <div className="row usuario">
            <img src="../assets/user.png" alt="user" />
            <ul>
              <li><p>{this.props.titulo}</p></li>
            </ul>
          </div>
          <div className="row meme">
            <img src={`../${this.props.foto}`} alt="meme" />
          </div>
          <div className="row botones">

            {this.state.error === 'error-puntuacion' ?
              <form>
                <p className="puntuacion"> ERROR AL PUNTUAR </p>
              </form>
              :
              <form>
                <p className="puntuacion">
                  <input onChange={this.cambiarPuntuacion} id={`radio5-${radioName}`} type="radio" name={radioName} value="5"></input>
                  <label htmlFor={`radio5-${radioName}`}>★</label>
                  <input onChange={this.cambiarPuntuacion} id={`radio4-${radioName}`} type="radio" name={radioName} value="4"></input>
                  <label htmlFor={`radio4-${radioName}`}>★</label>
                  <input onChange={this.cambiarPuntuacion} id={`radio3-${radioName}`} type="radio" name={radioName} value="3"></input>
                  <label htmlFor={`radio3-${radioName}`}>★</label>
                  <input onChange={this.cambiarPuntuacion} id={`radio2-${radioName}`} type="radio" name={radioName} value="2"></input>
                  <label htmlFor={`radio2-${radioName}`}>★</label>
                  <input onChange={this.cambiarPuntuacion} id={`radio1-${radioName}`} type="radio" name={radioName} value="1"></input>
                  <label htmlFor={`radio1-${radioName}`}>★</label>
                </p>
              </form>}
            {this.props.aprobacion ? null :
              <div>
                <input type="hidden" value="si" id="si" /><label htmlFor="si"><button onClick={this.aprobar.bind(this, 'si')} className="btn-success">APROBAR</button></label><br/>
                <input type="hidden" value="no" id="no" /><label htmlFor="no"><button onClick={this.aprobar.bind(this, 'no')} className="btn-danger">NO APROBAR</button></label>
              </div>
            }

            {this.state.error === 'error-favoritos' ?
              <a href="#???">Error</a>
              :
              <a href="#???" onClick={this.changeFav}><img src={this.state.fav ? "../assets/fav.png" : "../assets/no-fav.png"} alt="fav" /></a>}

            <a href="#???"><img src="../assets/compartir.png" alt="share" /></a>
          </div>
          <div className="row">
            <input onChange={this.cambiarComentario} type="text" placeholder='Haz un comentario' /><button onClick={this.enviarComentario}>---></button>
          </div>
          <ul>
            {this.state.comentariosDelMeme.map((comment) => (
              <li key={comment.idmeme + comment.username + comment.comentario}>{comment.username}: {comment.comentario} </li>
            )
            )}
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = Tarjeta;