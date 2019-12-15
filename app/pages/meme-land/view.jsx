const React = require('react');
const { Route } = require('react-router-dom');
const PaginaInicial = require('../../components/paginaInicial');
const PaginaMeme = require('../../components/paginaMeme');

class MemeLandPage extends React.Component {
    render() {
        const { memes, username, administrador } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                exact
                path="/"
                render={(props) => <PaginaInicial {...props} administrador={administrador} username={username} memes={memes} />}
                />
                <Route
                exact
                path="/:categoria"
                render={(props) => <PaginaInicial {...props} username={username} memes={memes} />}
                />
                <Route
                exact
                path="/favoritos/:user"
                render={(props) => <PaginaInicial {...props} username={username} memes={memes} />}
                /> 
                <Route
                exact
                path="/meme/:id"
                render={(props) => <PaginaMeme {...props} username={username} memes={memes} />}
                />
            </React.Fragment>
        );
    }
};

module.exports = MemeLandPage;
