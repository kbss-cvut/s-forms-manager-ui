import React from 'react';
import API from "../../api";
import Alert from "react-bootstrap/Alert";
import {RecordSnapshotLine} from "./RecordSnapshotLine";

export class RecordSnapshotList extends React.Component {

    constructor() {
        super();
        this.state = {
            recordSnapshots: null
        }
        this.requestRecordSnapshots = this.requestRecordSnapshots.bind(this)
        this.compareRecordSnapshotAnswers = this.compareRecordSnapshotAnswers.bind(this)
    }

    componentDidMount() {
        this.requestRecordSnapshots()
    }

    requestRecordSnapshots() {
        API.get("/rest/record/snapshot", {
            params: {
                "projectName": this.props.projectName,
                "recordURI": this.props.recordURI
            }
        }).then(response => {
            this.setState({
                recordSnapshots: response.data,
            });
        }).catch(error => {
            console.log(error)
        });
    }

    compareRecordSnapshotAnswers(recordSnapshotIndex) {
        if (recordSnapshotIndex <= 0 || recordSnapshotIndex >= this.state.recordSnapshots.length) {
            console.error("Index out of bounds!");
            return;
        }
        // alert("as a second snapshot, hardcoded value (sm498150982) is used due to lack of usable examples");

        const recordSnapshotContextUri1 = this.state.recordSnapshots[recordSnapshotIndex].internalKey;
        const recordSnapshotContextUri2 = this.state.recordSnapshots[recordSnapshotIndex - 1].internalKey; // TODO: when there's records with actual history
        // const recordSnapshotContextUri2 = "sm498150982"
        this.props.displayComparedAnswersFunction(recordSnapshotContextUri1, recordSnapshotContextUri2)
    }

    render() {
        if (!this.state.recordSnapshots) {
            return <Alert variant={"light"} className={"h-10"}>
                Loading history...
            </Alert>
        }

        let recordSnapshotsLines = this.state.recordSnapshots ? this.state.recordSnapshots.map((recordSnapshot, i) => {
            return <RecordSnapshotLine key={i}
                                       order={i}
                                       isHighlighted={this.props.highlightRecordSnapshotKey === recordSnapshot.internalKey}
                                       recordSnapshotURI={recordSnapshot.recordSnapshotURI}
                                       internalKey={recordSnapshot.internalKey}
                                       formTemplateVersionKey={recordSnapshot.formTemplateVersionKey}
                                       formTemplateVersionInternalName={recordSnapshot.formTemplateVersionInternalName}
                                       recordVersionKey={recordSnapshot.recordVersionKey}
                                       recordSnapshotCreated={recordSnapshot.recordSnapshotCreated}
                                       remoteSampleContextURI={recordSnapshot.remoteSampleContextURI}
                                       numberOfAnswers={recordSnapshot.numberOfAnswers}
                                       clickHandler={this.props.clickHandler}
                                       compareRecordSnapshotsFunction={this.compareRecordSnapshotAnswers}/>;
        }) : <Alert variant={"light"} className={"h-10"}>
            The list is empty.
        </Alert>

        return <div>
            <h5>History snapshots</h5>
            {recordSnapshotsLines}
        </div>

    }
}
