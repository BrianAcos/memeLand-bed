const React = require('react');
const config = require('../../../config');

class Filtros extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filtros: false,
            tag: '',
        }

        this.showFilter = this.showFilter.bind(this);
        this.searchTag = this.searchTag.bind(this);
        this.saveTag = this.saveTag.bind(this);
        this.pressEnter = this.pressEnter.bind(this);
    }

    showFilter() {
        this.setState({
            filtros: !this.state.filtros,
        });
    }

    searchTag() {
        window.location.href = `${config.url}/tags/${this.mySearch}`;
    }

    saveTag(e) {
        this.mySearch = e.target.value;
    }

    pressEnter(e) {
        if (e.key === 'Enter' && this.mySearch) {
            this.searchTag();
        }
    }

    render() {
        return (
            <div className={"estatico col-auto filtros " + (this.state.filtros ? "show" : "hidden")}>
                <div className="form-group">
                    <button onClick={this.showFilter} className="buttonFiltros" >F<br />I<br />L<br />T<br />R<br />O<br />S<br />></button>
                    <div className="dropdown">
                        <a className="btn btn-secondary btn-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categorias</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a className="dropdown-item" href="/categorias/peliculas">Peliculas</a>
                            <a className="dropdown-item" href="/categorias/acertijos">Acertijos</a>
                            <a className="dropdown-item" href="/categorias/animales">Animales</a>
                            <a className="dropdown-item" href="/categorias/deportes">Deportes</a>
                            <a className="dropdown-item" href="/categorias/gifs">Gifs</a>
                        </div>
                    </div>
                </div>
                <div>
                    <input onKeyPress={this.pressEnter} onChange={this.saveTag} type="text" id="mySearch" placeholder="Search..." />
                    <button onClick={this.searchTag}>&#128270;</button>
                </div>
                <ul className="otrosFiltros">
                    <a className="desactivado" href="#???"><li>TOP MEMES</li></a>
                    {/* <a className="desactivado" href="#???"><li>Recientes</li></a>
                    <a className="desactivado" href="#???"><li>Aleatorios</li></a>
                    <a href="#Favoritos" onClick={this.props.goToFavoritos} ><li>Favoritos</li></a> */}
                </ul>
            </div>
        );
    }
};

module.exports = Filtros;