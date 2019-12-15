const React = require('react');
const Tarjeta = require('../tarjeta');

class PaginaMeme extends React.Component {

    render() {
        const { memes, username } = this.props;
        return (
            <Tarjeta margin={'m-auto'} username={username} key={memes.idmeme} idmeme={memes.idmeme} creador={memes.creador} titulo={memes.titulo} tags={memes.tags} foto={memes.foto} categoria={memes.categoria} fecha={memes.fecha} votos={memes.votos} puntaje={memes.puntaje} aprobacion={memes.aprobacion} />
        )
    }
}

module.exports = PaginaMeme;