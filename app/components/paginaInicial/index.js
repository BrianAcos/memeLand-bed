const React = require('react');
const Tarjeta = require('../tarjeta');

class PaginaInicial extends React.Component {
    render() {
        const { memes } = this.props;

        return (
          <React.Fragment>
            <h1>Lista de Memes:</h1>
            <p>{this.props[0]}</p>
            <ul className="memes">
              {
                memes.map(meme => (
                  <Tarjeta key={meme.idmeme} titulo={meme.titulo} id={meme.idmeme} />
                ))
              }
            </ul>
          </React.Fragment>
        );
    }
};

module.exports = PaginaInicial;