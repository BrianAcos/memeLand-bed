const React = require('react')

class Login extends React.Component {
    render() {
        return (
            <div className="modal fade" id="sesion" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Iniciar seccion</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mr-auto ml-auto">
                            <form className="login" action="http://localhost:3001/login" method="post" encType="application/x-www-form-urlencoded">
                                <label htmlFor="username"><span>Nombre de usuario:</span></label>
                                <input required id="username" name="username"></input><br/>
                                <label htmlFor="password"><span>Contraseña:</span></label>
                                <input required id="password" type="password" name="password"></input><br/>
                                <button type="submit" className="btn btn-primary">Ingresar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Login;