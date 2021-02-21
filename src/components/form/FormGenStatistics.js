import React from 'react';
import API from "../../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class FormGenStatistics extends React.Component {

    constructor() {
        super();
        this.state = {
            contextStats: null
        }
        this.requestFormsStats = this.requestFormsStats.bind(this)
    }

    componentDidMount() {
        this.requestFormsStats();
    }

    requestFormsStats() {
        API.get("/rest/connection/stats/forms", {
            params: {
                "connectionName": this.props.connectionName
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
            totalContexts = this.state.contextsStats.totalContexts;
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
        return <Row>
            <Col xs={6}>
                <div>
                    <span>Total contexts: {this.state.contextsStats?.totalContexts || "?"}</span>
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
                <span>Unique saveHashes: <b>TODO</b></span>
                <br/>
            </Col>
        </Row>;
    }

}