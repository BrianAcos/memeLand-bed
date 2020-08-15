const React = require('react');
const config = require('../../../config');

class UserData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modificar: true,
            modificacion: '',
        }

        // si this.props.username = this.props.user.username no podes ver buton modificar

        this.modificarUser = this.modificarUser.bind(this);
        this.valueSobremi = this.valueSobremi.bind(this);
        this.valueNombre = this.valueNombre.bind(this);
        this.valueSexo = this.valueSexo.bind(this);
        this.valueBirthday = this.valueBirthday.bind(this);
        this.valueAvatar = this.valueAvatar.bind(this);
        this.mandarCambios = this.mandarCambios.bind(this);
        this.borrarUser = this.borrarUser.bind(this);
    }

    modificarUser() {
        this.setState({ modificar: false, });
    }

    valueSobremi(e) {
        this.sobremi = e.target.value;
    }
    valueNombre(e) {
        this.nombre = e.target.value;
    }
    valueSexo(e) {
        this.sexo = e.target.value;
    }
    valueBirthday(e) {
        this.birthday = e.target.value;
    }
    valueAvatar(e) {
        this.avatar = e.target.files[0];
    }

    borrarUser() {
        fetch(`${config.url}/api/users/${this.props.user.username}`, {
            method: 'DELETE',
        })
            .then((res) => { alert('borraste usuario'), console.log(res) }
            )
            .catch((err) => { this.setState({ modificacion: 'error' }), console.log(err) }
            )
    }

    mandarCambios() {
        var data = new FormData();
        data.append('avatar', this.avatar);
        data.append('nombre', this.nombre);
        data.append('sobremi', this.sobremi);
        data.append('sexo', this.sexo);
        data.append('birthday', this.birthday);
        fetch(`${config.url}/api/users/${this.props.user.username}`, {
            method: 'PUT',
            body: data,
        })
            .then(() => { window.location.href = config.url; this.setState({ modificacion: 'exitosa' }) })
            .catch(() => this.setState({ modificacion: 'error' }))
    }

    render() {
        this.props.capturarMeme;
        const birthday = new Date(this.props.user.birthday);
        const avatar = this.props.user.avatar ? this.props.user.avatar : 'assets/user.png';
        if (this.props.username !== this.props.user.username) {
            return (
                <div className="estatico col col-12 col-md-3">
                    <div className="tarjeta">
                        <div className="row usuario">
                            <img src={`../../${avatar}`} alt="user" />
                            <h1>{this.props.user.username}</h1>
                        </div>
                        <div className="row meme">
                            <ul>
                                <li>
                                    Cumpleaños: {`${birthday.getUTCDay()}-${birthday.getUTCMonth()}-${birthday.getUTCFullYear()}`}
                                </li>
                                <li>
                                    sexo: {this.props.user.sexo}
                                </li>
                                <li>
                                    sobre {this.props.user.nombre}: {this.props.user.sobremi}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="estatico col col-12 col-md-3">
                    <div className="tarjeta">
                        <div className="row usuario">
                            <img src={`../../${avatar}`} alt="user" />
                            <h1>{this.props.user.username}</h1>
                        </div>
                        <div className="row meme">
                            <ul>
                                <li>
                                    Cumpleaños: {`${birthday.getUTCDay()}/${birthday.getUTCMonth()}/${birthday.getUTCFullYear()}`}
                                </li>
                                <li>
                                    sexo: {this.props.user.sexo}
                                </li>
                                <li>
                                    sobre {this.props.user.nombre}: {this.props.user.sobremi}
                                </li>
                            </ul>
                        </div>
                        <div className="row botones">
                            {this.state.modificar === false ?
                                <form >
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input onChange={this.valueNombre} type="text" id="nombre" /><br />
                                    <label htmlFor="birthday">Cumpleaños:</label>
                                    <input onChange={this.valueBirthday} type="date" id="birthday" /><br />
                                    <label htmlFor="sexo">sexo:</label>
                                    <input onChange={this.valueSexo} type="text" id="sexo" /><br />
                                    <label htmlFor="sobremi">Sobre Ti:</label>
                                    <input onChange={this.valueSobremi} type="text" id="sobremi" /><br />
                                    <label htmlFor="avatar">Avatar:</label>
                                    <input onChange={this.valueAvatar} type="file" name="avatar" id="avatar" /><br />
                                    <button onClick={this.mandarCambios}>Guardar cambios</button>
                                </form>
                                :
                                <div>
                                    <button onClick={this.modificarUser}>Modificar</button>
                                    <button onClick={this.borrarUser} className='btn-danger' >Borrar Cuenta</button>
                                    <button onClick={this.add} className='btn-danger' >Add</button>
                                    <button onClick={this.subtract} className='btn-danger' >subrtact</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

module.exports = UserData;
