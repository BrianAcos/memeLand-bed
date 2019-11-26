import React from 'react';

class SubirMeme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: ''
        }
    }

    render() {
        return (
            <div className="modal fade" id="subirMeme" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Subí tu Meme</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mr-auto ml-auto">
                            <form className="subirMeme" action="http://localhost:3001/api/memes" method="post" encType="multipart/form-data">
                            <label htmlFor="titulo"><span>Titulo:</span></label>
                            <input name="titulo" onChange={this.capturarTitulo} required type="text" id="titulo" placeholder="Título para el meme"></input>
                            <br></br>
                            <label htmlFor="imagen"><span>Sube una imagen:</span></label>
                            <input name="imagen" onChange={this.capturarImagen} required type="file" id="imagen"></input>
                            <br></br>
                            <label htmlFor="categoria"><span>Categoria:</span></label>
                            <select name="categoria" onChange={this.capturarCategoria} required id="categoria">
                                <option value="uncategorized">Categorias</option>
                                <option value="acertijos">Acertijos</option>
                                <option value="animales">Animales</option>
                                <option value="deportes">Deportes</option>
                                <option value="gifs">Gifs</option>
                                <option value="peliculas">Peliculas</option>
                                <option value="uncategorized">Uncategorized</option>
                            </select>
                            <br></br>
                            <button className="subir" type="submit" onClick={this.mandarCambios} >Subir Meme</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubirMeme;