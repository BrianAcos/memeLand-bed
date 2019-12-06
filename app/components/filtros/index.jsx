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
                    <button onClick={this.changeState} className="buttonFiltros" >F<br />I<br />L<br />T<br />R<br />O<br />S<br />></button>
                    <div className="dropdown">
                        <a className="btn btn-secondary btn-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categorias</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a className="dropdown-item" href="/peliculas">Peliculas</a>
                            <a className="dropdown-item" href="/acertijos">Acertijos</a>
                            <a className="dropdown-item" href="/animales">Animales</a>
                            <a className="dropdown-item" href="/deportes">Deportes</a>
                            <a className="dropdown-item" href="/gifs">Gifs</a>
                        </div>
                    </div>
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