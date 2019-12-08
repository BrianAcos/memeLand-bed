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

class PaginaPerfil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            loading: false,
            error: false,
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header username={this.props.username} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col contenido">
                            <div className="row">
                                <UserStats user={this.props.user} />
                                <UserData username={this.props.username} user={this.props.user} />
                                {/* tarjeta con ultimos memes */}
                            </div>
                        </div>
                    </div>
                </div>
                <SubirMeme username={this.props.username} />
                <Contacto />
                <Login />
                <Registro />
                <Contacto />
            </React.Fragment >
        );
    }
};

module.exports = PaginaPerfil;