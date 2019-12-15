const React = require('react');
const { Route } = require('react-router-dom');
const PaginaPerfil = require('../../components/paginaPerfil');

class MemeLandPage extends React.Component {
    render() {
        const { user, username, administrador, memes } = this.props.initialState;
        return (
            <PaginaPerfil {...this.props} administrador={administrador} username={username} user={user} memes={memes} />
        );
    }
};

module.exports = MemeLandPage;
