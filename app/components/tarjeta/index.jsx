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
      comentariosDelMeme: {},
      puntajeDelMeme: {},
    }

    this.enviarComentario = this.enviarComentario.bind(this);
    this.cambiarComentario = this.cambiarComentario.bind(this);
    this.changeFav = this.changeFav.bind(this);
    this.cambiarPuntuacion = this.cambiarPuntuacion.bind(this);
  }

  componentDidMount() {
    fetch(`/api/comentarios/memes/${this.props.idmeme}`)       //VA A LA API A BUSCAR LOS DATOS SOBRE ESA TAREA Y LOS CARGA EN EL ESTADO
      .then(res => res.json())
      .then(data => {
        this.setState({
          comentariosDelMeme: data,
          error: false,
        });
        console.log(data);
        
      })
      .catch((err) => {
        this.setState({
          comentariosDelMeme: {},
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
        console.log(data);
        
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
    return (
      <div className="col col-12 col-md-6">
        <div className="tarjeta">
          <div className="row usuario">
            <img src="assets/user.png" alt="user" />
            <ul>
              <li><p>{this.props.titulo}</p></li>
            </ul>
          </div>
          <div className="row meme">
            <img src={this.props.foto} alt="meme" />
          </div>
          <div className="row botones">

            {this.state.error === 'error-puntuacion' ?
              <form id="puntuacion">
                <p className="puntuacion"> ERROR AL PUNTUAR </p>
              </form>
              :
              <form id="puntuacion">
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

            {this.state.error === 'error-favoritos' ?
              <a href="#???">Error</a>
              :
              <a href="#???" onClick={this.changeFav}><img src={this.state.fav ? "assets/fav.png" : "assets/no-fav.png"} alt="fav" /></a>}

            <a href="#???"><img src="assets/compartir.png" alt="share" /></a>
          </div>
          <div className="row">
            <input onChange={this.cambiarComentario} type="text" placeholder='Haz un comentario' /><button onClick={this.enviarComentario}>---></button>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Tarjeta;