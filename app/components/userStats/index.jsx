const React = require('react');

class UserStats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            puntaje: {},
            loading: false,
            error: false,
        }
    }

    componentDidMount() {
        fetch(`/api/puntajes/creador/${this.props.user.username}`)       //VA A LA API A BUSCAR LOS DATOS SOBRE ESA TAREA Y LOS CARGA EN EL ESTADO
            .then(res => res.json())
            .then(data => {
                this.setState({
                    puntaje: data,
                    loading: false,
                    error: false,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    task: null,
                    loading: false,
                    error: true,
                });
            });
        
    }

    render() {
        const promedio =  Math.round(this.state.puntaje.puntos/this.state.puntaje.votos*10)/10;
        return (
            <div className="col col-12 col-md-4">
                <div className="tarjeta">
                    <div className="row meme">
                        <h1>Estadisticas:</h1><br/>
                        <ul>
                            <li>
                                Votos: {this.state.puntaje.votos}
                            </li>
                            <li>
                                Puntaje: {this.state.puntaje.puntos}
                            </li>
                            <li>
                                Promedio: {promedio}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = UserStats;