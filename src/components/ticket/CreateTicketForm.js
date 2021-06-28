import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import {IntelligentQuestionSelector} from "../search/IntelligentQuestionSelector";
import Button from "react-bootstrap/Button";
import API from "../../api";
import Alert from "react-bootstrap/Alert";

export class CreateTicketForm extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            relateToForm: false,
            relateToFormVersion: false,
            relateToQuestion: false
        }
        this.onChangeSetState = this.onChangeSetState.bind(this);
        this.onSubmitProject = this.onSubmitProject.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.questionSelectorRef = React.createRef();
    }


    onChangeSetState(e) {
        const {name, value} = e.target;
        this.setState(prevState => ({...prevState, [name]: value}));
    }

    onSubmitProject(e) {
        e.preventDefault();
        API.post("/rest/ticket", {
            projectName: this.props.projectName,
            recordContextUri: this.props.contextUri,
            name: this.state.name,
            description: this.state.description,
            relateToForm: this.state.relateToForm,
            relateToFormVersion: this.state.relateToFormVersion,
            relateToQuestion: this.state.relateToQuestion,
            questionOriginPath: this.questionSelectorRef?.current?.state.activeQuestionOriginPath,
        }).then((response) => {
            this.ticketForm.reset();
            this.setState({
                showError: false,
                showSuccess: true,
                ticketLink: response.data,
                relateToForm: false,
                relateToFormVersion: false,
                relateToQuestion: false
            });
        }).catch((error) => {
                console.log(error)
                this.setState({showError: true, showSuccess: false}); // todo: improve handling individual messages
            }
        );
    }

    render() {
        return <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <div>
                        <Row>
                            <Col>
                                <div>
                                    <Form onSubmit={this.onSubmitProject} ref={form => this.ticketForm = form}>
                                        <Form.Group controlId="nameControl">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text"
                                                          placeholder="ticket name"
                                                          name="name"
                                                          onChange={this.onChangeSetState}/>
                                        </Form.Group>
                                        <Form.Group controlId="descriptionControl">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea"
                                                          placeholder="ticket description"
                                                          name="description" rows={3}
                                                          onChange={this.onChangeSetState}/>
                                        </Form.Group>
                                        <ToggleButton variant="light" style={{marginBottom: "0"}} type="checkbox"
                                                      checked={this.state.relateToForm}
                                                      value="1"
                                                      onChange={e => this.setState({relateToForm: e.currentTarget.checked})}>
                                            {' '} Relate to form
                                        </ToggleButton>
                                        {' '}
                                        <ToggleButton variant="light" style={{marginBottom: "0"}} type="checkbox"
                                                      checked={this.state.relateToFormVersion}
                                                      value="1"
                                                      onChange={e => this.setState({relateToFormVersion: e.currentTarget.checked})}>
                                            {' '} Relate to form version
                                        </ToggleButton>
                                        {' '}
                                        <ToggleButton variant="light" style={{marginBottom: "0"}} type="checkbox"
                                                      checked={this.state.relateToQuestion}
                                                      value="1"
                                                      onChange={e => this.setState({relateToQuestion: e.currentTarget.checked})}>
                                            {' '} Relate to question (origin path)
                                        </ToggleButton>
                                        {this.state.relateToQuestion ?
                                            <IntelligentQuestionSelector projectName={this.props.projectName}
                                                                         ref={this.questionSelectorRef}/> : <div/>}
                                        <br/>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                        {this.state.showError === true && this.errorMessage()}
                                        {this.state.showSuccess === true && this.successMessage()}
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card>;
    }

    errorMessage() {
        return <div>
            <br/>
            <Alert variant="danger" onClose={() => this.setState({showError: false})} dismissible>
                <Alert.Heading>Warning!</Alert.Heading>
                <p>Creating project was not successful.</p>
            </Alert>
        </div>
    }

    successMessage() {
        return <div>
            <br/>
            <Alert variant="success" onClose={() => this.setState({showSuccess: false})} dismissible>
                <Alert.Heading>Success!</Alert.Heading>
                Creating ticket was successful. <a target={"_blank"} href={this.state.ticketLink}>ticket link</a>
            </Alert>
        </div>
    }

}
