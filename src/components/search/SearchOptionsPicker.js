import React from 'react';
import API from "../../api";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {ExtensibleAutocompleteFields} from "./ExtensibleAutocompleteFields";
import {DagDemo} from "./AutocompleteTextField";


export class SearchOptionsPicker extends React.Component {

    constructor() {
        super();
        this.state = {
            query: "",
        }
        this.updateQueryEditor = this.updateQueryEditor.bind(this)
    }

    componentDidMount() {
        this.updateQueryEditor()
    }

    updateQueryEditor(queryId, parameter1, parameter2) {
        API.get("/rest/search/updateQuery", {
            params: {
                projectName: this.props.projectName,
                queryId: queryId,
                parameter1: parameter1 || "",
                parameter2: parameter2 || ""
            }
        }).then((response) => {
            this.setState({query: response.data})
            this.props.changeQuery(response.data);
        }).catch((error) => {
                console.log(error)
                this.setState({showError: true, showSuccess: false}); // todo: improve handling individual messages
            }
        );
    }

    getAutocompleteValues() {
        API.get("/rest/search/getAutocomplete", {
            params: {
                projectName: this.props.projectName,
                depth: 0,
                questionOriginPath: "http://vfn.cz/ontologies/fss-form/primary-treatment--d-h--size-of-the-tumor--latero-lateral-q-qo"
            }
        }).then((response) => {
            // this.setState({query: response.data})
            // this.props.changeQuery(response.data);
            console.log(response)
        }).catch((error) => {
                console.log(error)
                this.setState({showError: true, showSuccess: false}); // todo: improve handling individual messages
            }
        );
    }

    render() {

        return <ListGroup>
            <ListGroup.Item>
                <Row>
                    <Col xs={10}>
                        <h5>Autocomplete</h5>
                        <DagDemo/>
                    </Col>
                </Row>
            </ListGroup.Item>

            <ListGroup.Item>
                <Row>
                    <Col xs={10}>
                        <h5>Use Case 1</h5>
                        <span>For <b>any FormTemplateVersion</b>, what question have <b>always the same answer</b>?</span>
                        <br/>

                    </Col>
                    <Col>
                        <Button variant="primary" onClick={() => this.updateQueryEditor("usecase1")}>
                            Load SPARQL
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col xs={10}>
                        <h5>Use Case 2</h5>
                        <span>For <b>specific FormTemplateVersion</b>, what question have <b>always the same answer</b>?</span>
                        <br/>
                        <br/>
                        <Form.Group controlId="useCase2Parameter1FG">
                            <Form.Control type="text" placeholder="versionKey"
                                          onChange={(event) => {
                                              this.setState({usecase1Parameter1: event.target.value});
                                              this.getAutocompleteValues()
                                          }
                                          }/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="primary"
                                onClick={() => this.updateQueryEditor("usecase2", this.state.usecase1Parameter1)}>
                            Load SPARQL
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col xs={10}>
                        <h5>Use Case 3</h5>
                        <span>Find all records where <b>latest answer</b> conforms <b>certain condition</b>.</span>
                        <br/>
                        <br/>
                    </Col>
                    <Col>
                        <Button variant="primary"
                                onClick={() => this.updateQueryEditor("usecase3")}>
                            Load SPARQL
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col xs={10}>
                        <h5>Use Case 4</h5>
                        <span>Find all records where <b>2 latest answers</b> conform <b>certain condition</b>.</span>
                        <br/>
                        <br/>
                    </Col>
                    <Col>
                        <Button variant="primary"
                                onClick={() => this.updateQueryEditor("usecase4")}>
                            Load SPARQL
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col xs={10}>
                        <h5>Use Case with autocomplete</h5>
                        <span>Find all records where <b>2 latest answers</b> conform <b>certain condition</b>.</span>
                        <br/>
                        <br/>
                        <ExtensibleAutocompleteFields projectName={this.props.projectName}/>
                    </Col>
                    <Col>
                        <Button variant="primary"
                                onClick={() => this.updateQueryEditor("usecase4")}>
                            Load SPARQL
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>


        </ListGroup>
    }
}