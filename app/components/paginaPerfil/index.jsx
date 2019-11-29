const React = require('react');
const { Link } = require('react-router-dom');
const Header = require('../header');
const SubirMeme = require('../subirMeme');
const UserData = require('../userData');
const UserStats = require('../userStats');

class PaginaPerfil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            loading: false,
            error: false,
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
                        <div className="col contenido">
                            <div className="row">
                                <UserStats nombre={this.state.user.nombre} birthday={this.state.user.birthday} sexo={this.state.user.sexo} sobremi={this.state.user.sobremi} avatar={this.state.user.avatar} />
                                {/* <UserData nombre={this.state.user.nombre} birthday={this.state.user.birthday} sexo={this.state.user.sexo} sobremi={this.state.user.sobremi} /> */}
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