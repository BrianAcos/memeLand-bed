const React = require('react');
const { Route } = require('react-router-dom');
const PaginaInicial = require('../../components/paginaInicial');
const PaginaPerfil = require('../../components/paginaPerfil');

class MemeLandPage extends React.Component {
    render() {
        const { memes, username } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                exact
                path="/"
                render={(props) => <PaginaInicial {...props} username={username} memes={memes} />}
                />
                <Route
                exact
                path="/perfil/:username"
                render={(props) => <PaginaPerfil {...props} username={props.match.params.username} />}
                />
                <Route
                exact
                path="/favoritos/:username"
                render={(props) => <PaginaInicial {...props} memes={memes} username={props.match.params.username}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = MemeLandPage;
