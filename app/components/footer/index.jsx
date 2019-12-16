const React = require('react');

class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
        <a href="#contacto" data-toggle="modal" data-target="#contacto">CONTACTO(FOOTER)</a>
        <h1><a href="#">Esta pagina fue posible gracias a Gonzalo Gismero</a></h1>
      </div>
    );
  }
};

module.exports = Footer;