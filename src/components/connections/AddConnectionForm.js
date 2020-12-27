import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import API from "../../api";
import Alert from "react-bootstrap/Alert";
import {connect} from "react-redux";
import {addConnectionsToStore} from "../../actions";
import Container from "react-bootstrap/Container";

const mapStateToProps = state => ({connections: state.connections})

const mapDispatchToProps = dispatch => {
    return ({
        addConn: (name) => {
            dispatch(addConnectionsToStore(name))
        }
    })
}

class AddConnectionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionName: '',
            formGenRepositoryUrl: '',
            serviceUrl: '',
            appRepositoryUrl: '',
            showSuccess: false,
            showError: false
        }
        this.baseState = this.state
        this.onChangeSetState = this.onChangeSetState.bind(this);
        this.onSubmitConnection = this.onSubmitConnection.bind(this);
    }

    onChangeSetState(e) {
        const {name, value} = e.target;
        this.setState(prevState => ({...prevState, [name]: value}));
    }

    onSubmitConnection(e) {
        e.preventDefault();
        API.post("/rest/connections", {
            connectionName: this.state.connectionName,
            formGenRepositoryUrl: this.state.formGenRepositoryUrl,
            formGenServiceUrl: this.state.serviceUrl,
            appRepositoryUrl: this.state.appRepositoryUrl
        }).then(() => {
            this.props.addConn(this.state.connectionName)
            this.messageForm.reset();
            this.state = this.baseState
            this.setState({showError: false, showSuccess: true});
        }).catch((error) => {
                console.log(error)
                this.setState({showError: true, showSuccess: false}); // todo: improve handling individual messages
            }
        );
    }

    render() {
        return <Container>
            <br/>
            <h3>
                Add Connection
            </h3>
            <br/>
            <div>
                <Form onSubmit={this.onSubmitConnection} ref={form => this.messageForm = form}>
                    <Form.Group controlId="formBasicConnectionName">
                        <Form.Label>Connection name</Form.Label>
                        <Form.Control type="text" placeholder="Connection name" name="connectionName"
                                      onChange={this.onChangeSetState}/>
                        <Form.Text className="text-muted">
                            Please choose a suitable connection name without whitespaces. Something like
                            "study-manager".
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicFormGenRepositoryUrl">
                        <Form.Label>FormGen Repository URL</Form.Label>
                        <Form.Control type="text" placeholder="FormGen Repository URL" name="formGenRepositoryUrl"
                                      onChange={this.onChangeSetState}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicServiceUrl">
                        <Form.Label>FormGen Service URL</Form.Label>
                        <Form.Control type="text" placeholder="FormGen Service URL" name="serviceUrl"
                                      onChange={this.onChangeSetState}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicAppRepositoryUrl">
                        <Form.Label>App Repository URL</Form.Label>
                        <Form.Control type="text" placeholder="App Repository URL" name="appRepositoryUrl"
                                      onChange={this.onChangeSetState}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {this.state.showError === true && this.errorMessage()}
                {this.state.showSuccess === true && this.successMessage()}
            </div>
        </Container>
    }

    errorMessage() {
        return <div>
            <br/>
            <Alert variant="danger" onClose={() => this.setState({showError: false})} dismissible>
                <Alert.Heading>Warning!</Alert.Heading>
                Creating connection was not successful.
            </Alert>
        </div>
    }

    successMessage() {
        return <div>
            <br/>
            <Alert variant="success" onClose={() => this.setState({showSuccess: false})} dismissible>
                <Alert.Heading>Success!</Alert.Heading>
                Creating connection was not successful.
            </Alert>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddConnectionForm);
