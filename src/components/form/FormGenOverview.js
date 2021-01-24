import React from 'react';
import {SFormsDisplay} from "../SFormsDisplay";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import API from "../../api";
import Button from "react-bootstrap/Button";
import {FormGenVersionList} from "./FormGenVersionList";
import {FormGenList} from "./FormGenList";
import VersionsHistogramChart from "../graphs/VersionsHistogramChart";

const LEFT_DISPLAY_VERSIONS_LIST = "DISPLAY_VERSIONS_LIST";
const LEFT_DISPLAY_FORMS_LIST = "DISPLAY_FORMS_LIST";
const RIGHT_DISPLAY_VERSION_GRAPH = "DISPLAY_VERSION_GRAPH"
const RIGHT_DISPLAY_S_FORMS = "RIGHT_DISPLAY_S_FORMS"

export class FormGenOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contexts: [],
            leftComponent: null,
            rightComponent: null,
            activeContext: null
        }
        this.updateActiveContextUri = this.updateActiveContextUri.bind(this)
        this.requestFormsStats = this.requestFormsStats.bind(this)
    }


    componentDidMount() {
        this.requestFormsStats();
    }

    updateActiveContextUri(contextUri) {
        this.setState({activeContext: contextUri, rightComponent: RIGHT_DISPLAY_S_FORMS})
    }

    requestFormsStats() {
        API.get("/rest/connection/stats/forms", {
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
        let emptyContexts;
        if (this.state.contextsStats) {
            totalContexts = this.state.contextsStats.totalContexts
            processedContexts = this.state.contextsStats.processedContexts
            recognizedVersions = this.state.contextsStats.recognizedVersions;
            recognizedInstances = this.state.contextsStats.recognizedInstaces;
            nonEmptyContexts = this.state.contextsStats.nonEmptyContexts;
            emptyContexts = processedContexts - nonEmptyContexts;
        } else {
            totalContexts = "?";
            processedContexts = "?";
            recognizedVersions = "?";
            nonEmptyContexts = "?";
            recognizedInstances = "?";
            emptyContexts = "?";
        }

        let leftComponent;
        switch (this.state.leftComponent) {
            case LEFT_DISPLAY_VERSIONS_LIST:
                leftComponent = <FormGenVersionList connectionName={this.props.match.params.connectionName}
                                                    updateActiveContextUri={this.updateActiveContextUri}/>
                break;
            case LEFT_DISPLAY_FORMS_LIST:
                leftComponent = <FormGenList connectionName={this.props.match.params.connectionName}
                                             updateActiveContextUri={this.updateActiveContextUri}/>
                break;
            default:
                leftComponent = <div/>
                break;
        }
        let rightComponent;
        switch (this.state.rightComponent) {
            case RIGHT_DISPLAY_S_FORMS:
                rightComponent = <SFormsDisplay key={this.state.activeContext}
                                                contextUri={this.state.activeContext}
                                                connectionName={this.props.match.params.connectionName}/>
                break;
            case RIGHT_DISPLAY_VERSION_GRAPH:
            default:
                rightComponent = <VersionsHistogramChart connectionName={this.props.match.params.connectionName}/>
                break;
        }

        return (
            <Container fluid>
                <Container>
                    <br/>
                    <h4>
                        Processed Forms: {this.props.match.params.connectionName}
                    </h4>
                    <Row>
                        <Col xs={6}>
                            <div>
                                <span>Total contexts: {totalContexts}</span>
                                <br/>
                                <span>Processed contexts: {processedContexts}</span>
                                <br/>
                                <span>Empty form contexts: {emptyContexts}</span>
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
                            onClick={() => this.setState({leftComponent: LEFT_DISPLAY_FORMS_LIST})}>
                        Show forms
                    </Button>
                    {' '}
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.setState({
                                leftComponent: LEFT_DISPLAY_VERSIONS_LIST,
                                rightComponent: RIGHT_DISPLAY_VERSION_GRAPH
                            })}>
                        Show versions
                    </Button>
                    {' '}
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.setState({rightComponent: RIGHT_DISPLAY_VERSION_GRAPH})}>
                        Show versions graph
                    </Button>

                    <br/><br/>
                </Container>
                <Row>
                    <Col xs={6}>
                        <div>
                            {leftComponent}
                        </div>
                    </Col>
                    <Col xs={6}>
                        {rightComponent}
                    </Col>
                </Row>
            </Container>)
    }
}
