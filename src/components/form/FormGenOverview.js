import React from 'react';
import {SFormsDisplay} from "../SFormsDisplay";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import API from "../../api";
import Button from "react-bootstrap/Button";


export const DEFAULT_CONTEXT = "http://vfn.cz/ontologies/study-manager/formGen1601802887303";

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
        let formsUploads;
        let recognizedVersions;
        let recognizedInstances;
        if (this.state.contextsStats) {
            formsUploads = this.state.contextsStats.formUploads
            recognizedVersions = this.state.contextsStats.recognizedVersions;
            recognizedInstances = this.state.contextsStats.recognizedInstaces;
        } else {
            formsUploads = "?";
            recognizedVersions = "?";
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
                    <span>Total form uploads (including re-uploads): <b>{formsUploads}</b></span>
                    <br/>
                    <span>Total form instances: <b>{recognizedInstances}</b></span>
                    <br/>
                    <span>Recognized form versions: <b>{recognizedVersions}</b></span>
                    <br/>
                    <hr/>
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessBatch()}>
                        Show instances
                    </Button>
                    {' '}
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessBatch()}>
                        Show versions
                    </Button>
                    {' '}
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessBatch()}>
                        Show all uploads
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
