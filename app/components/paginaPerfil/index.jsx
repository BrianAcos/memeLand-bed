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

    render() {
        return (
            <React.Fragment>
                <Header username={this.props.user.username}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col contenido">
                            <div className="row">
                                <UserStats user={this.props.user}/>
                                <UserData currentUser={this.props.currentUser} user={this.props.user}/>
                                {/* tarjeta con ultimos memes */}
                            </div>
                        </div>  
                    </div>
                </div>
                <SubirMeme currentUser={this.props.currentUser} />
            </React.Fragment >
        );
    }
};

module.exports = PaginaPerfil;