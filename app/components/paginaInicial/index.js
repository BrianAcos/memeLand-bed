import React from 'react';
import Header from '../header';
import Inicio from '../sectionInicio';
import SubirMeme from '../subirMeme';
import Favoritos from '../sectionFavoritos';
import Registro from '../registro';
import Login from '../login';
import Contacto from '../contacto';

class PaginaInicial extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: '',
      seccion: 1,
      categorias: null,
      memes: this.props.memes,
    };
  }

  setCategoria(categoria) {
    this.setState({
      setCategoria: categoria.categorias
    })
  }

  setFav(id, fav, meme) {
    this.setState({
      memes: this.state.memes.map(item => item.id !== id ? item : {
        ...item,
        fav: !fav,
      }),
    });
  }

  setLike (id, like) {
    this.setState({
      memes: this.state.memes.map(item => item.id !== id ? item : {
        ...item,
        like: like
      }),
    });
  }
  
  goToInicio () {
    this.setState({
      seccion: 1
    });
  }

  goToFavoritos () {
    this.setState({
      seccion: 2
    });
  }


  currentSection() {
    if (this.state.seccion === 1) {
      return <Inicio goToFavoritos={this.goToFavoritos} categorias={this.state.categorias} memes={this.state.memes} setFav={this.setFav} setLike={this.setLike} setDislike={this.setDislike} setCategoria={this.setCategoria} />;
    }
    if (this.state.seccion === 2) {
      return <Favoritos categorias={this.state.categorias} memes={this.state.memes} setFav={this.setFav} setLike={this.setLike} setDislike={this.setDislike} setCategoria={this.setCategoria} />;
    }
  }

  render() {
    return (
      <div>
        <Header
          goToInicio={this.goToInicio}
          goToSubirMeme={this.goToSubirMeme}
          goToFavoritos={this.goToFavoritos}
          session={this.state.session} />
        {this.currentSection()}
        <SubirMeme />
        <Contacto />
        <Registro />
        <Login />
      </div >
    );
  }
}

module.exports = PaginaInicial;