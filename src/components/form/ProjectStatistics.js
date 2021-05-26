import React from 'react';
import API from "../../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

export class ProjectStatistics extends React.Component {

    constructor() {
        super();
        this.state = {
            totalContexts: "?",
            recordVersions: "?",
            recordSnapshots: "?",
            emptyRecordSnapshots: "?",
            nonEmptyRecordSnapshots: "?",
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
                emptyRecordSnapshots: data.emptyRecordSnapshots,
                nonEmptyRecordSnapshots: data.nonEmptyRecordSnapshots,
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
            <Col xs={4}>
                <div>
                    <span>
                        Total form views{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">All known form views in the remote formGen
                                repository. 1 Form view corresponds to 1 Record snapshot. </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}: <b>{this.state.totalContexts}</b>
                    </span>
                    <br/>
                    <span>
                        Processed form views{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">
                                Record snapshots that has been processed with s-forms-manager.
                            </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}:<b>{this.state.recordSnapshots}</b></span>
                    <br/>
                </div>
            </Col>

            <br/>
            <Col xs={4}>
                <div>
                    <span>
                        Form templates{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">
                                Form template is different for each subject of study.
                                <br/>
                                <br/>
                                So far is recognized by origin of the root question of the asked questions.
                            </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}:<b>{this.state.formTemplates}</b>
                    </span>
                    <br/>
                    <span>
                        Form template versions{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">
                                Represents unique set of questions in an unambiguous order.
                            </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}:<b>{this.state.formTemplateVersions}</b>
                    </span>
                    <br/>
                    <hr/>
                </div>
            </Col>
            <Col xs={4}>
                <div>
                    <span>
                        Question templates{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">
                                Represents question. Is part of form template.
                            </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}:<b>{this.state.questionTemplates}</b>
                    </span>
                    <br/>
                    <span>
                        Question template snapshots{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">
                                Represents question and it's unambiguous position in the question tree.
                                <br/>
                                Is part of the form template version.
                            </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}:<b>{this.state.questionTemplateSnapshots}</b>
                    </span>
                    <br/>
                </div>
            </Col>
            <Col xs={4}>
                <div>
                    <span>
                    Records{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">
                                Recognized records.
                                <br/>
                                <br/>
                                In some projects 1 Record corresponds to 1 Patient record.
                            </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}:<b>{this.state.records}</b>
                    </span>
                    <br/>

                    <span>
                    Record versions{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">
                                Represents unique set of questions and answers for a specific record.
                                <br/>
                                <br/>
                                Is always different for different records.
                                <br/>
                                <br/>
                                Is different for each form submission where questions or answers changed.
                                <br/>
                                <br/>
                                Record version is not present in the records that have no questions and answers (empty
                                records).
                            </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}:<b>{this.state.recordVersions}</b>
                    </span>
                </div>
            </Col>
            <Col xs={4}>
                <div>
                    <span>
                    Empty record snapshots{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">
                                Record snapshots that are NOT associated with any questions.
                            </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}:<b>{this.state.emptyRecordSnapshots}</b>
                    </span>
                    <br/>
                    <span>
                    Non-empty record snapshots{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">
                                Record snapshots that are associated with at least some questions (user has seen the
                                form).
                            </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}:<b>{this.state.nonEmptyRecordSnapshots}</b>
                    </span>
                </div>
            </Col>
        </Row>
    }
}