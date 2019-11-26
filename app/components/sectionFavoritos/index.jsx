import React from 'react';
import Tarjeta from '../tarjeta';
import Filtros from '../filtros';

class Favoritos extends React.Component {
    render() {
        var memesFiltrados = this.props.memes
            .filter(item => this.props.categorias === null || this.props.categorias === 'Categorias' || this.props.categorias === item.categorias)
            .filter(item => item.fav);
        return (
            <div className="container-fluid">
                <div className="row">
                    <Filtros goToFavoritos={this.props.goToFavoritos} setCategoria={this.props.setCategoria} />
                    <div className="col contenido">
                        <div className="row">
                            {memesFiltrados.map(item => <Tarjeta id={item.idmeme} meme={item} key={item.idmeme} setFav={this.props.setFav} setLike={this.props.setLike} setDislike={this.props.setDislike} />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Favoritos;