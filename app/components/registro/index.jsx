const React = require('react');

class Registro extends React.Component {
    render() {
        return (
            <div className="modal fade" id="registro" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Registro de usuario</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mr-auto ml-auto">
                            <form className="registro" action="http://localhost:3001/api/users" method="post" encType="application/x-www-form-urlencoded">
                                <label  htmlFor="username"><span>Nombre de usuario:</span></label>
                                <input required id="username" name="username"></input><br></br>
                                <label htmlFor="password"><span>Contraseña:</span></label>
                                <input required id="password" name="password"></input><br></br>
                                <label htmlFor="email"><span>Email:</span></label>
                                <input required id="email" name="email" type="email"></input><br></br>
                                <label htmlFor="nombre"><span>Nombre:</span></label>
                                <input required id="nombre" name="nombre"></input><br></br>
                                <input required type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                <label className="form-check-label" htmlFor="exampleCheck1">Acepto la <a href="#politica">Politica de la pagina</a></label>
                                <button type="submit" className="btn btn-primary">Registrarse</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Registro;