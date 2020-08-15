const React = require('react');
const config = require('../../../config');

class ModificarMeme extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modificacion: '',
        }


        this.valueCategoria = this.valueCategoria.bind(this);
        this.valueTags = this.valueTags.bind(this);
        this.valueTitulo = this.valueTitulo.bind(this);
        this.mandarCambios = this.mandarCambios.bind(this);
        this.borrarMeme = this.borrarMeme.bind(this);
    }

    valueTitulo(e) {
        this.titulo = e.target.value;
    }
    valueCategoria(e) {
        this.categoria = e.target.value;
    }
    valueTags(e) {
        this.tags = e.target.value;
    }

    mandarCambios() {
        console.log(this.tags);

        var data = new FormData();
        data.append('tags', this.tags);
        data.append('titulo', this.titulo);
        data.append('categoria', this.categoria);
        fetch(`${config.url}/api/memes/1`, {
            method: 'PUT',
            body: data,
        })
            .then(() => alert('modificaste'))
            .catch(() => alert('error'))
    }

    //borrar meme 
    borrarMeme() {
        fetch(`/api/memes/${this.props.idmeme}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'DELETE',
        })
            .then(() => {
                alert('borraste el meme')
            })
            .catch(() => {
                alert('error al borrar el meme')
            })
    }

    render() {
        const username = this.props.username;
        return (
            <div className="modal fade" id="modificarMeme" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Modificar Meme</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mr-auto ml-auto">
                            <label htmlFor="modificarTitulo">Titulo:</label>
                            <input onChange={this.valueTitulo} type="text" id="modificarTitulo" /><br />
                            <label htmlFor="modificarCategoria">Categoria:</label>
                            <input onChange={this.valueCategoria} type="text" id="modificarCategoria" /><br />
                            <label htmlFor="modificarTags">Tags:</label>
                            <input onChange={this.valueTags} type="text" id="modificarTags" /><br />
                            <button onClick={this.mandarCambios}>Modificar</button><br />
                            <button onClick={this.borrarMeme}>Borrar</button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = ModificarMeme;
