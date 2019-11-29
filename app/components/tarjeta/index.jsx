//import React from 'react';
const React = require('react');
const session = require('express-session');

class Tarjeta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      puntuacion: false,
      redirect: false,
      error: null,
      fav: false,
    }

    this.changeFav = this.changeFav.bind(this);
    this.cambiarPuntuacion = this.cambiarPuntuacion.bind(this);
  }

  cambiarPuntuacion(event) {
    fetch('/api/puntajes', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        idmeme: this.props.idmeme,
        // username: this.props.username, EL USUARIO QUE HIZO CLICK ESTA EN LA SESSION
        puntaje: event.target.value,
      }),
    })
      .then(() => {
        this.setState({ puntuacion: true });
        fetch('/api/users/puntuar', {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: 'POST',
          body: JSON.stringify({
            username: this.props.creador,
            puntaje: puntaje
          }),
        });
        fetch('/api/memes/puntuar', {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: 'POST',
          body: JSON.stringify({
            idmeme: this.props.idmeme,
            puntaje: puntaje
          })
        })
      })
      .catch(() => {
        this.setState({ error: 'error-puntuacion' });
      })
  }

  changeFav() {
    fetch('/api/favoritos', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        username: session.name, //EL USUARIO QUE HIZO CLICK ESTA EN LA SESSION
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

    if (this.state.error === 'error general') {
      return (
        <div className="col col-12 col-md-6"> OCURRIO UN ERROR </div>
      )
    } else {
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
          </div>
        </div>
      )
    };
  }
}

module.exports = Tarjeta;