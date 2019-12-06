const React = require('react');

class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
        <a href="#contacto" data-toggle="modal" data-target="#contacto">CONTACTO(FOOTER)</a>
      </div>
    );
  }
};

module.exports = Footer;