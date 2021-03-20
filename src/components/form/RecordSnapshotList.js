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
        this.requestRecordVersions = this.requestRecordVersions.bind(this)
    }

    componentDidMount() {
        this.requestRecordVersions()
    }

    requestRecordVersions() {
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

    render() {
        if (!this.state.recordSnapshots) {
            return <Alert variant={"light"} className={"h-10"}>
                Loading history...
            </Alert>
        }

        let recordVersionsLines = this.state.recordSnapshots ? this.state.recordSnapshots.map((recordSnapshot, i) => {
            return <RecordSnapshotLine key={i}
                                       recordSnapshotURI={recordSnapshot.recordSnapshotURI}
                                       internalKey={recordSnapshot.internalKey}
                                       formTemplateVersionKey={recordSnapshot.formTemplateVersionKey}
                                       formTemplateVersionInternalName={recordSnapshot.formTemplateVersionInternalName}
                                       recordSnapshotCreated={recordSnapshot.recordSnapshotCreated}
                                       remoteSampleContextURI={recordSnapshot.remoteSampleContextURI}
                                       numberOfAnswers={recordSnapshot.numberOfAnswers}
                                       clickHandler={this.props.clickHandler}/>;
        }) : <Alert variant={"light"} className={"h-10"}>
            The list is empty.
        </Alert>

        return <div>
            <h5>History</h5>
            {recordVersionsLines}
        </div>

    }
}
