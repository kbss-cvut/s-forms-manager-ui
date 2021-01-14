import React from 'react';
import {SFormsDisplay} from "../SFormsDisplay";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import API from "../../api";
import Button from "react-bootstrap/Button";


export class FormGenOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contexts: [],
            activeContext: null,
            filterProcessed: false,
            contextsStats: null
        }
        this.requestFormsStats = this.requestFormsStats.bind(this)
    }


    componentDidMount() {
        this.requestFormsStats();
    }

    requestFormsStats() {
        API.get("/rest/formGen/info/formStats", {
            params: {
                "connectionName": this.props.match.params.connectionName
            }
        }).then((response) => {
            this.setState({contextsStats: response.data})
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        let totalContexts;
        let processedContexts;
        let recognizedVersions;
        let recognizedInstances;
        let nonEmptyContexts;
        if (this.state.contextsStats) {
            totalContexts = this.state.contextsStats.totalContexts
            processedContexts = this.state.contextsStats.processedContexts
            recognizedVersions = this.state.contextsStats.recognizedVersions;
            recognizedInstances = this.state.contextsStats.recognizedInstaces;
            nonEmptyContexts = this.state.contextsStats.nonEmptyContexts;
        } else {
            totalContexts = "?";
            processedContexts = "?";
            recognizedVersions = "?";
            nonEmptyContexts = "?";
            recognizedInstances = "?";
        }

        return (
            <Container fluid>
                <Container>
                    <br/>
                    <h4>
                        Processed Forms: {this.props.match.params.connectionName}
                    </h4>
                    <br/>
                    <Row>
                        <Col xs={6}>
                            <div>
                                <span>Total contexts: <b>{totalContexts}</b></span>
                                <br/>
                                <span>Processed contexts: <b>{processedContexts}</b></span>
                                <br/>
                                <span>Non-empty form contexts: <b>{nonEmptyContexts}</b></span>
                                <br/>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <span>Recognized form instances: <b>{recognizedInstances}</b></span>
                            <br/>
                            <span>Recognized form versions: <b>{recognizedVersions}</b></span>
                            <br/>
                        </Col>
                    </Row>

                    <hr/>
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessBatch()}>
                        Show forms
                    </Button>
                    {' '}
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessBatch()}>
                        Show versions
                    </Button>

                    <br/><br/>
                </Container>
                <Row>
                    <Col xs={6}>
                        <div>
                            {/*<ContextList contexts={this.state.contexts}*/}
                            {/*             connectionName={this.props.match.params.connectionName}*/}
                            {/*             filterProcessed={this.state.filterProcessed}*/}
                            {/*             updateActiveContextUri={this.updateActiveContextUri}*/}
                            {/*/>*/}
                        </div>
                    </Col>
                    <Col xs={6}>
                        <SFormsDisplay key={this.state.activeContext}
                                       contextUri={this.state.activeContext}
                                       connectionName={this.props.match.params.connectionName}/>
                    </Col>
                </Row>
            </Container>)
    }
}
