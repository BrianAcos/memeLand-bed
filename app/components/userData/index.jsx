const React = require('react');

class UserData extends React.Component {

    render() {
        return (
            <div className="col col-12 col-md-4">
                <div className="tarjeta">
                    <div className="row usuario">
                        <img src={this.props.avatar} alt="user" />
                        <ul>
                            <li><p>{this.props.nombre}</p></li>
                        </ul>
                    </div>
                    <div className="row meme">
                        <ul>
                            <li>
                                Cumpleaños: {this.props.birthday}
                            </li>
                            <li>
                                sexo: {this.props.sexo}
                            </li>
                            <li>
                                sobre {this.props.nombre}: {this.props.sobremi}
                            </li>
                        </ul>
                    </div>
                    <div className="row botones">

                        {this.state.error === 'error-puntuacion' ?
                            <form id="puntuacion">
                                <p className="puntuacion"> ERROR AL PUNTUAR </p>
                            </form>
                            :
                            <form id="puntuacion">
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
                            </form>}

                        {this.state.error === 'error-favoritos' ?
                            <a href="#???">Error</a>
                            :
                            <a href="#???" onClick={this.cargarDatosUsuario}><img src={this.state.fav ? "assets/fav.png" : "assets/no-fav.png"} alt="fav" /></a>}

                        <a href="#???"><img src="assets/compartir.png" alt="share" /></a>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = UserData;