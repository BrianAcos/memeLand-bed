const React = require('react');
const { Route } = require('react-router-dom');
const PaginaPerfil = require('../../components/paginaPerfil');

class MemeLandPage extends React.Component {
    render() {
        const { user, currentUser } = this.props.initialState;
        return (
            <PaginaPerfil {...this.props} currentUser={currentUser} user={user} />
        );
    }
};

module.exports = MemeLandPage;
