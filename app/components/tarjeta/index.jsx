//import React from 'react';
const React = require('react');

class Tarjeta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      puntuacion: false,
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
    this.borrarMeme = this.borrarMeme.bind(this);
  }

  //borrar meme solo si sos el que lo creo
  borrarMeme() {
    if (this.props.creador === this.props.username) {
      fetch(`/api/memes/${this.props.idmeme}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'DELETE',
      })
        .then(() => {
          alert('borraste el meme')
        })
        .catch(() => {
          alert('error al borrar el meme')
        })
    } else {alert('solo el creador puede borrar el meme')}
  }

  //en /noaprobados aparecen los memes no aprobados y se envia la calificacion si o no 
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

  //cuando carga la aplicacion  hace un fetch las tarjetas para ir a buscar los comentarios de ese meme y los puntos
  componentDidMount() {
    fetch(`/api/comentarios/memes/${this.props.idmeme}`)
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
        alert('error al cargar comentarios');
      });
    fetch(`/api/puntajes/memes/${this.props.idmeme}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          puntajeDelMeme: data,
          error: false,
        });
      })
      .catch((err) => {
        this.setState({
          puntajeDelMeme: {},
          error: 'error-carga-de-puntaje',
        });
        alert('error al cargar puntaje');
      });
  }

  //envia el comentario que hizo el usuario y tira de nuevo el componentdidmount para que aparezca el comentario que realizo
  enviarComentario() {
    if (this.props.username) {
      fetch('/api/comentarios', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
          idmeme: this.props.idmeme,
          username: this.props.username, // EL USUARIO QUE HIZO CLICK ESTA EN LA SESSION
          comentario: this.state.comentario,
        }),
      })
        .then(() => {
          this.setState({ comentario: true });
          this.componentDidMount();
          alert('has comentado');
        })
        .catch(() => {
          this.setState({ error: 'error-comentario' });
          alert('error al comentar');
        })
    } else {
      alert('debes estar registrado para comentar');
    }
  }

  //guarda en el estado lo que va comentando el usuario en el meme
  cambiarComentario(event) {
    if (this.props.username) {
      this.setState({ comentario: event.target.value });
    } else {
      alert('debes estar registrado para comentar');
    }
  }

  //cuando hace click en las estrellas califica el meme
  cambiarPuntuacion(event) {
    const puntaje = event.target.value;
    if (this.props.username) {
      fetch('/api/puntajes', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
          idmeme: this.props.idmeme,
          username: this.props.username, // EL USUARIO QUE HIZO CLICK ESTA EN LA SESSION
          puntaje: puntaje,
          creador: this.props.creador,
        }),
      })
        .then((res) => {
          if (res.status === 500) {   //NO ENTIENDO PORQUE NO VA A CATCH!!??
            alert(`error al puntuar`)
            this.setState({ error: 'error-puntuacion' });
          } else {
            this.setState({ puntuacion: true });
            this.componentDidMount();
            alert(`diste una puntuacion de ${puntaje}`);
          }
        })
        .catch(() => {
          this.setState({ error: 'error-puntuacion' });
          alert('error al puntuar');
        })
    } else {
      alert('debes registrarte para puntuar');
    }
  }

  //cuando hace click en el boton favoritos agrega a favoritos y cambia el estado
  changeFav() {
    if (this.props.username) {
      fetch('/api/favoritos', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
          username: this.props.username, //EL USUARIO QUE HIZO CLICK ESTA EN LA SESSION
          idmeme: this.props.idmeme,
        })
      })
        .then((res) => {  //NO ENTIENDO PORQUE NO VA A CATCH!!??
          if (res.status === 500) {
            this.setState({ error: 'error-favoritos' });
            alert('error al agregar a favoritos');
          } else {
            this.setState({ fav: true });
            alert('agregaste a favoritos');
          }
        })
        .catch(() => {
          this.setState({ error: 'error-favoritos' });
          alert('error al agregar a favoritos')
        })
    } else {
      alert('Registrese para agregar a favoritos')
    }
  }


  render() {
    const path = 'http://localhost:3001';
    const promedio = this.state.puntajeDelMeme.puntos / this.state.puntajeDelMeme.votos;
    const radioName = `estrellas-${this.props.idmeme}`;  //nombre para identificar a cada estrella de puntuacion
    if (this.state.borrarComponente === true) { return (null) }  //usado para borrar los las tarjetas cuando se aprueba o se desaprueba un meme
    if (this.props.foto === undefined) {
      return (
        <div className="col col-12 col-md-6"><h1>NO HAY MEMES AQUI</h1></div>
      )
    }
    return (
      <div className='col-md-6 offset-md-3'>
        <div className="tarjeta">
          <div className="row usuario">
            <img src="../assets/user.png" alt="user" />
            <ul>
              <li>{this.props.creador}</li>
              <li><p>{this.props.titulo}</p></li>
            </ul>
            <img onClick={this.borrarMeme} className="borrar" src="../assets/lupa.png" alt="borrar"/>
          </div>
          <a href={path + `/meme/${this.props.idmeme}`}>
            <div className="row meme">
              <img src={`../${this.props.foto}`} alt="meme" />
            </div>
          </a>
          <div className="row botones">

            {this.state.error === 'error-puntuacion' ? //si hay un error al puntuar tira un error en la tarjeta
              <form>
                <p className="puntuacion">ERROR</p>
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
                <p>Votos:{this.state.puntajeDelMeme.votos} &emsp; prom:{promedio}</p>
              </form>}
            {this.props.aprobacion ? null :  //componente para cuando hay que aprobar o desaprobar un meme
              <div>
                <input type="hidden" value="si" id="si" /><label htmlFor="si"><button onClick={this.aprobar.bind(this, 'si')} className="btn-success">APROBAR</button></label><br />
                <input type="hidden" value="no" id="no" /><label htmlFor="no"><button onClick={this.aprobar.bind(this, 'no')} className="btn-danger">NO APROBAR</button></label>
              </div>
            }

            {this.state.error === 'error-favoritos' ?  //cuando hay un error al agregar a favoritos se dibuja un error
              <p className="puntuacion">ERROR</p>
              :
              <a href="#???" onClick={this.changeFav}><img src={this.state.fav ? "../assets/fav.png" : "../assets/no-fav.png"} alt="fav" /></a>}

            <a href="#???"><img src="../assets/compartir.png" alt="share" /></a>
          </div>
          <div className="row">
            <input onChange={this.cambiarComentario} type="text" placeholder='Haz un comentario' /><button onClick={this.enviarComentario}>---></button>
          </div>
          <ul>
            {this.state.comentariosDelMeme.map((comment) => (  //map para listar los comentarios
              <li key={comment.idmeme + comment.username + comment.comentario}>{comment.username}: {comment.comentario} </li>
            )
            )}
          </ul>
        </div>
      </div>
    )
  }
}

//new Date() .day . mount
// time stamp

module.exports = Tarjeta;