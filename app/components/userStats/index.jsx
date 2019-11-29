const React = require('react');

class UserData extends React.Component {

  render() {
    return (
      <ul>
        <li>
          Cumpleaños: {this.props.birthday}
        </li>
        <li>
          sexo: {this.props.sexo}
        </li>
        <li>
          sobre {this.props.nombre}: {this.props.sobremi}
        </li>
      </ul>
    )
  }
}

module.exports = UserData;