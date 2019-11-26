import React from 'react';

class TarjetaFavoritos extends React.Component {

  changeFav () {
    this.props.setFav(this.props.meme.id, this.props.meme.fav, this.props.meme);
  }
  
  changeDislike () {
    this.props.setDislike(this.props.meme.id, !this.props.meme.dislike);
    console.log(this.props.meme.dislike);
  }
  
  changeLike () {
    this.props.setLike(this.props.meme.id, !this.props.meme.like);
      console.log(this.props.meme.like);
  }
  
  render() {
    return (
      <div className="col col-12 col-md-6">
        <div className="tarjeta">
          <div className="row usuario">
            <img src="assets/user.png" alt="user" />
            <ul>
              <li>{this.props.meme.titulo}</li>
            </ul>
          </div>
          <div className="row meme">
            <img src={this.props.meme.foto} alt="meme" />
          </div>
          <div className="row botones">
            <a href="#???" onClick={this.changeLike}><img src={(this.props.meme.like ? "assets/like.png" : "assets/no-like.png")} alt="like" /></a>
            <a href="#???" onClick={this.changeDislike}><img src={(this.props.meme.dislike ? "assets/dislike.png" : "assets/no-dislike.png")} alt="dislike" /></a>
            <a href="#???" onClick={this.changeFav}><img src={(this.props.meme.fav ? "assets/fav.png" : "assets/no-fav.png")} alt="fav" /></a>
            <a href="#???"><img src="assets/compartir.png" alt="share" /></a>
          </div>
        </div>
      </div>
    );
  }
}

export default TarjetaFavoritos;