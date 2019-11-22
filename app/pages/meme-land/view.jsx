const React = require('react');
const { Route } = require('react-router-dom');
const PaginaInicial = require('../../components/paginaInicial');

class MemeLandPage extends React.Component {
    render() {
        const { memes } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                exact
                path="/"
                render={(props) => <PaginaInicial {...props} memes={memes} />}
                />
            </React.Fragment>
        );
    }
};

module.exports = MemeLandPage;