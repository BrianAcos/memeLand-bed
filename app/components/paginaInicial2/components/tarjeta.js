import React from 'react';

class Tarjeta extends React.Component {

  cambiarPuntuacion() {
    fetch('/api/')
  }

  changeFav () {
    this.props.setFav(this.props.meme.id, this.props.meme.fav, this.props.meme);
    console.log(this.props.meme.fav);
  }

  render() {
    const radioName = `estrellas-${this.props.id}`;
    return (
      <div className="col col-12 col-md-6">
        <div className="tarjeta">
          <div className="row usuario">
            <img src="assets/user.png" alt="user" />
            <ul>
              <li><p>{this.props.meme.titulo}</p></li>
            </ul>
          </div>
          <div className="row meme">
            <img src={this.props.meme.foto} alt="meme" />
          </div>
          <div className="row botones">
            <form id="puntuacion">
              <p onClick={this.cambiarPuntuacion} className="puntuacion">
                <input id={`radio1-${radioName}`} type="radio" name={radioName} value="5"></input>
                <label htmlFor={`radio1-${radioName}`}>★</label>
                <input id={`radio2-${radioName}`} type="radio" name={radioName} value="4"></input>
                <label htmlFor={`radio2-${radioName}`}>★</label>
                <input id={`radio3-${radioName}`} type="radio" name={radioName} value="3"></input>
                <label htmlFor={`radio3-${radioName}`}>★</label>
                <input id={`radio4-${radioName}`} type="radio" name={radioName} value="2"></input>
                <label htmlFor={`radio4-${radioName}`}>★</label>
                <input id={`radio5-${radioName}`} type="radio" name={radioName} value="1"></input>
                <label htmlFor={`radio5-${radioName}`}>★</label>
              </p>
            </form>
            <a href="#???" onClick={this.changeFav}><img src={(this.props.meme.fav ? "assets/fav.png" : "assets/no-fav.png")} alt="fav" /></a>
            <a href="#???"><img src="assets/compartir.png" alt="share" /></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Tarjeta;