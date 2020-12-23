import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import API from "../../api"
import {removeConnectionsFromStore} from "../../actions";

const mapStateToProps = state => {
    return ({connections: state.connections})
}

const mapDispatchToProps = dispatch => {
    return ({
        removeConn: (name) => {
            dispatch(removeConnectionsFromStore(name))
        }
    })
}

class DeleteConnectionForm extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
        this.deleteConnection = this.deleteConnection.bind(this);
    }

    deleteConnection() {
        API.delete("/rest/connections", {
            data: this.props.connectionName
        }).then(response => {
            this.props.removeConn(this.props.connectionName)
            this.props.refreshCallBack()
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        if (this.state.show) {
            return (
                <div>
                    <br/>
                    <Alert variant="danger" onClose={() => this.setState({show: false})} dismissible>
                        <Alert.Heading>Warning!</Alert.Heading>
                        <p>
                            You are about to delete a connection. Are you sure want to do it?
                        </p>
                        <Button variant="outline-danger"
                                onClick={() => this.deleteConnection()}>Delete</Button>
                    </Alert>
                </div>
            );
        }
        return <Button variant="outline-danger" onClick={() => this.setState({show: true})}>Delete</Button>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConnectionForm);