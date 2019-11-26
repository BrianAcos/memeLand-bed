import React from 'react';
import Header from './components/header';
import Inicio from './sections/inicio';
import SubirMeme from './sections/subirMeme';
import Favoritos from './sections/favoritos';
import Registro from './components/registro';
import Login from './components/login';
import Contacto from './components/contacto';

class PaginaInicial extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seccion: 1,
      categorias: null,
      memes: this.props.memes,
    };
  }

  generadorId() {
    var idMayor = this.state.memes.sort((a, b) => b.id - a.id)[0];
    if (idMayor === undefined) {
      return 1;
    } else {
      return idMayor.id + 1;
    }
  }

  setCategoria(categoria) {
    this.setState({
      setCategoria: categoria.categorias
    })
  }

  // setCategoria = (categoria) => {
  //   this.setState({
  //     categorias: categoria.categorias
  //   })
  //   console.log(this.state);
  // }

  subirMeme(subirMeme) {
    this.setState({
      memes: [...this.state.memes, {
        id: this.generadorId(),
        titulo: subirMeme.titulo,
        fecha: subirMeme.fecha,
        foto: "assets/newMeme.jpg",
        categorias: subirMeme.categorias,
        fav: false,
        dislike: false,
        like: false,
      }]
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

  setDislike (id, dislike) {
    this.setState({
      memes: this.state.memes.map(item => item.id !== id ? item : {
        ...item,
        dislike: dislike
      })
    });
  }

  goToInicio () {
    this.setState({
      seccion: 1
    });
  }

  goToSubirMeme () {
    this.setState({
      seccion: 2
    });
  }

  goToFavoritos () {
    this.setState({
      seccion: 3
    });
  }


  currentSection() {
    if (this.state.seccion === 1) {
      return <Inicio goToFavoritos={this.goToFavoritos} categorias={this.state.categorias} memes={this.state.memes} setFav={this.setFav} setLike={this.setLike} setDislike={this.setDislike} setCategoria={this.setCategoria} />;
    }
    if (this.state.seccion === 2) {
      return <SubirMeme subirMeme={this.subirMeme} />;
    }
    if (this.state.seccion === 3) {
      return <Favoritos categorias={this.state.categorias} memes={this.state.memes} setFav={this.setFav} setLike={this.setLike} setDislike={this.setDislike} setCategoria={this.setCategoria} />;
    }
  }

  render() {
    return (
      <div>
        <Header
          goToInicio={this.goToInicio}
          goToSubirMeme={this.goToSubirMeme}
          goToFavoritos={this.goToFavoritos} />
        {this.currentSection()}
        <Contacto />
        <Registro />
        <Login />
      </div >
    );
  }
}

module.exports = PaginaInicial;