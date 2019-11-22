const React = require('react');

class Tarjeta extends React.Component {
  render() {
    return (
      <li>
          <h2>{this.props.id}: {this.props.titulo}</h2>
      </li>
    );
  }
};

module.exports = Tarjeta;