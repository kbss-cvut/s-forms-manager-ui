import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";

export class CreateTicketForm extends React.Component {

    constructor() {
        super();
        this.state = {
            relateToForm: false,
            relateToFormVersion: false,
            relateToQuestion: false
        }
    }

    render() {

        return <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <div>
                        <Row>
                            <Col>
                                <div>
                                    <Form.Group controlId="ticketName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="ticket name"/>
                                    </Form.Group>
                                    <Form.Group controlId="ticketName">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea"
                                                      placeholder="ticket description"
                                                      name="ticketDescription" rows={3}
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
                                    <br/>
                                    {/*<Form.Group controlId="questionOrigin">*/}
                                    {/*    <Form.Label>Question-Origin</Form.Label>*/}
                                    {/*    <Form.Control as="text"*/}
                                    {/*                  placeholder={"question origin path"}*/}
                                    {/*                  name="questionOriginPath" // TODO: DAG select*/}
                                    {/*                  onChange={this.onChangeSetState}/>*/}
                                    {/*</Form.Group>*/}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card>;
    }

}
