const React = require('react');
const { Link } = require('react-router-dom');
const Header = require('../header');
const SubirMeme = require('../subirMeme');

class PaginaPerfil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
        }
    }

    componentDidMount() {
            fetch(`/api/users/${this.props.username}`)       //VA A LA API A BUSCAR LOS DATOS SOBRE ESA TAREA Y LOS CARGA EN EL ESTADO
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        user: data,
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
        return (
            <React.Fragment>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        {/* <Filtros /> */}
                        <div className="col contenido">
                            <div className="row">
                                MI PERFIL {this.state.user.username}
                {/* {
                  memes.map(meme => (
                    <Tarjeta key={meme.idmeme} idmeme={meme.idmeme} creador={meme.creador} titulo={meme.titulo} tags={meme.tags} foto={meme.foto} categoria={meme.categoria} fecha={meme.fecha} votos={meme.votos} puntaje={meme.puntaje} />
                  ))
                } */}
                            </div>
                        </div>
                    </div>
                </div>
                <SubirMeme />
            </React.Fragment >
        );
    }
};

module.exports = PaginaPerfil;