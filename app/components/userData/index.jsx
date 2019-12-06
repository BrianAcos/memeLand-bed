const React = require('react');

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

    mandarCambios() {
        var data = new FormData();
        data.append('avatar', this.avatar);
        data.append('nombre', this.nombre);
        data.append('sobremi', this.sobremi);
        data.append('sexo', this.sexo);
        data.append('birthday', this.birthday);
        fetch(`http://localhost:3001/api/users/${this.props.user.username}`, {
            method: 'PUT',
            body: data,
        })
            .then(() => this.setState({ modificacion: 'exitosa' }))
            .catch(() => this.setState({ modificacion: 'error' }))
    }

    render() {
        const avatar = this.props.user.avatar ? this.props.user.avatar : 'assets/user.png';
        if (this.props.currentUser !== this.props.user.username) {
            return (
                <div className="col col-12 col-md-4">
                    <div className="tarjeta">
                        <div className="row usuario">
                            <img src={`../../${avatar}`} alt="user" />
                            <h1>{this.props.user.username}</h1>
                        </div>
                        <div className="row meme">
                            <ul>
                                <li>
                                    Cumpleaños: {this.props.user.birthday}
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
                <div className="col col-12 col-md-4">
                    <div className="tarjeta">
                        <div className="row usuario">
                            <img src={`../../${avatar}`} alt="user" />
                            <h1>{this.props.user.username}</h1>
                        </div>
                        <div className="row meme">
                            <ul>
                                <li>
                                    Cumpleaños: {this.props.user.birthday}
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
                                <button onClick={this.modificarUser}>Modificar</button>
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

module.exports = UserData;