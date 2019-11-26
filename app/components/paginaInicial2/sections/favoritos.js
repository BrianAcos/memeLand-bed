import React from 'react';
import TarjetaFavoritos from '../components/tarjetaFavoritos';
import Filtros from '../components/filtros';

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
                            {memesFiltrados.map(item => <TarjetaFavoritos meme={item} key={item.id} setFav={this.props.setFav} setLike={this.props.setLike} setDislike={this.props.setDislike} />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Favoritos;