import React from 'react';

class SubirMeme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: ''
        }
    }

    capturarTitulo (e) {
        this.setState({
            titulo: e.target.value
        });
    }

    capturarImagen (e) {
        this.setState({
            foto: e.target.value
        });
    }

    capturarCategoria (e) {
        this.setState({
            categorias: e.target.value
        });
    }

    capturarFecha (e) {
        this.setState({
            fecha: e.target.value
        });
    }

    mandarCambios (e) {
        this.props.subirMeme ({
            titulo: this.state.titulo,
            foto: this.state.foto,
            categorias: this.state.categorias,
            fecha: this.state.fecha
        });
        this.setState({
            titulo: ''
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col mr-auto ml-auto">
                        <form onSubmit={this.handleSubmit} className="newMeme" action="http://localhost:3001/api/memes" method="post" encType="multipart/form-data">
                            <h1>Subí un MEME:</h1>
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
        );
    }
}

export default SubirMeme;