import React from 'react';
import {SFormsDisplay} from "../SFormsDisplay";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export class FormTemplateVersionCompareBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            version1: "",
            version2: ""
        }
        this.versionTextField1 = React.createRef();
        this.versionTextField2 = React.createRef();
    }

    render() {

        return <div>
            <Row>
                <Col>
                    <Form.Group controlId="formVersionFilter">
                        <Form.Label>
                            Select version 1

                        </Form.Label>

                        <Form.Control type="text" placeholder="version name" ref={this.versionTextField1}/>

                    </Form.Group>
                </Col>
                <Col>

                    <Form.Group controlId="formVersionFilter">
                        <Form.Label>
                            Select version 2
                        </Form.Label>
                        <Form.Control type="text" placeholder="version name" ref={this.versionTextField2}/>

                    </Form.Group>
                </Col>

            </Row>
            <Button variant="primary" onClick={() => {
                this.setState({
                    version1: this.versionTextField1.current.value,
                    version2: this.versionTextField2.current.value
                })
            }}>
                Compare!
            </Button>
            <Row>
                <SFormsDisplay version1={this.state.version1}
                               version2={this.state.version2}
                               projectName={this.props.projectName}/>
            </Row>
        </div>

    }
}
