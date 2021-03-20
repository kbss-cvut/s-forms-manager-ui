import React from 'react';
import API from "../../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class RecordsStatistics extends React.Component {

    constructor() {
        super();
        this.state = {
            totalContexts: "?",
            recordVersions: "?",
            recordSnapshots: "?",
            records: "?",
            formTemplates: "?",
            formTemplateVersions: "?",
            questionTemplates: "?",
            questionTemplateSnapshots: "?",
            answers: "?"
        }
        this.requestFormsStats = this.requestFormsStats.bind(this)
    }

    componentDidMount() {
        this.requestFormsStats();
    }

    requestFormsStats() {
        API.get("/rest/project/stats/forms", {
            params: {
                "projectName": this.props.projectName
            }
        }).then((response) => {
            return response.data;
        }).then((data) => {
            this.setState({
                totalContexts: data.totalContexts,
                recordVersions: data.recordVersions,
                recordSnapshots: data.recordSnapshots,
                records: data.records,
                formTemplates: data.formTemplates,
                formTemplateVersions: data.formTemplateVersions,
                questionTemplates: data.questionTemplates,
                questionTemplateSnapshots: data.questionTemplateSnapshots,
                answers: data.answers
            })
        }).catch((error) => {
            console.log(error)
        });
    }


    render() {
        return <Row>
            <Col xs={6}>
                <div>
                    <span>Total contexts: {this.state.totalContexts}</span>
                    <br/>
                    <span>Record snapshots (imported contexts): {this.state.recordSnapshots}</span>
                    <br/>
                </div>
            </Col>
            <Col xs={6}>
                <div>
                    <span>Record versions: {this.state.recordVersions}</span>
                    <br/>
                    <span>Records: {this.state.records}</span>
                    <br/>
                </div>
            </Col>
            <br/>
            <Col xs={6}>
                <div>
                    <span>FormTemplates: {this.state.formTemplates}</span>
                    <br/>
                    <span>FormTemplate versions: {this.state.formTemplateVersions}</span>
                    <br/>
                </div>
            </Col>
            <Col xs={6}>
                <div>
                    <span>Question templates: {this.state.questionTemplates}</span>
                    <br/>
                    <span>Question template snapshots: {this.state.questionTemplateSnapshots}</span>
                    <br/>
                </div>
            </Col>
        </Row>
    }
}