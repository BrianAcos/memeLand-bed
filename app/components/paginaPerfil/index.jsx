const React = require('react');
const { Link } = require('react-router-dom');
const Header = require('../header');
const SubirMeme = require('../subirMeme');
const UserData = require('../userData');
const UserStats = require('../userStats');
const Login = require('../login');
const Registro = require('../registro');
const Footer = require('../footer');
const Contacto = require('../contacto');
const Tarjeta = require('../tarjeta');
const ModificarMeme = require('../modificarMeme');

class PaginaPerfil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            loading: false,
            error: false,
        }

        this.capturarMeme = this.capturarMeme.bind(this);
    }

    capturarMeme() {
        this.state.idmeme = this.props.idmeme;
        console.log(this.state.idmeme);
        
    }

    render() {
        const memes = this.props.memes === '404 not found' ? [''] : this.props.memes;
        return (
            <React.Fragment>
                <Header username={this.props.username} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col contenido">
                            <div className="row">
                                <UserStats user={this.props.user} />
                                <UserData capturarMeme={this.capturarMeme} username={this.props.username} user={this.props.user} />
                                {
                                    memes.map(meme => (
                                        <Tarjeta user={this.props.user} perfil={'perfil'} username={this.props.username} key={meme.idmeme + meme.creador} idmeme={meme.idmeme} creador={meme.creador} titulo={meme.titulo} tags={meme.tags} foto={meme.foto} categoria={meme.categoria} fecha={meme.fecha} votos={meme.votos} puntaje={meme.puntaje} aprobacion={meme.aprobacion} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <SubirMeme username={this.props.username} />
                <Footer />
                <Contacto />
                <Login />
                <Registro />
                <Contacto />
                <ModificarMeme idmeme={this.props.idmeme} />
            </React.Fragment >
        );
    }
};

module.exports = PaginaPerfil;