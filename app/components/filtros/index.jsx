const React = require('react');

class Filtros extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filtros: false,
        }

        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        this.setState({
            filtros: !this.state.filtros,
        });
    }

    render() {
        return (
            <div className={"col-auto filtros " + (this.state.filtros ? "show" : "hidden")}>
                <div className="form-group">
                    <button onClick={this.changeState} className="buttonFiltros" >F<br></br>I<br></br>L<br></br>T<br></br>R<br></br>O<br></br>S<br></br>></button>
                    <select onChange={this.cambiarCategorias} onClick={this.mandarCategorias} className="custom-select custom-select-sm">
                        <option defaultValue="all">Categorias</option>
                        <option value="acertijos">Acertijos</option>
                        <option value="animales">Animales</option>
                        <option value="deportes">Deportes</option>
                        <option value="gifs">Gifs</option>
                        <option value="peliculas">Peliculas</option>
                        <option value="uncategorized">Uncategorized</option>
                    </select>
                </div>
                <ul className="otrosFiltros">
                    <a className="desactivado" href="#???"><li>TOP MEMES</li></a>
                    <a className="desactivado" href="#???"><li>Recientes</li></a>
                    <a className="desactivado" href="#???"><li>Aleatorios</li></a>
                    <a href="#Favoritos" onClick={this.props.goToFavoritos} ><li>Favoritos</li></a>
                </ul>
            </div>
        );
    }
};

module.exports = Filtros;