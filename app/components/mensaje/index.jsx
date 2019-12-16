const React = require('react');

class Mensaje extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.mensaje}</h1>
            </div>
        );
    }
}

module.exports = Mensaje;